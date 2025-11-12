import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";
import CustomerService from "@/services/customer-service";
import OrderDetailsService from "@/services/orderdetails-service";
import PaymentService from "@/services/payment-service";
import CustomItineraryService from "@/services/custom-itinerary-service";
import ItineraryService from "@/services/itinerary-service";
import ItineraryStopsService from "@/services/itinerary-stops-service";
import LocationsService from "@/services/locations-service";

const customerService = new CustomerService();
const orderDetailsService = new OrderDetailsService();
const paymentService = new PaymentService();
const customItineraryService = new CustomItineraryService();
const itineraryService = new ItineraryService();
const itineraryStopsService = new ItineraryStopsService();
const locationsService = new LocationsService();

export async function POST(req: Request) {
  const body = await req.json();
  try {
    // insert to payment
    const newPayment = await paymentService.addPayment(body.payment);
    console.log("NEW PAYMENT: ", newPayment);

    //insert to itinerary
    try {
      const newItinerary = await itineraryService.addItinerary({
        price: body.itinerary.price,
        type: body.itinerary.type,
      });

      console.log("NEW ITINERARY: ", newItinerary);

      //insert to customer
      const base64Data = body.customer.ID_PictureB64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const buffer = Buffer.from(base64Data, "base64");

      const uploadsDir = path.join(process.cwd(), "public/id-uploads");
      if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });

      const filename = `id_${body.customer.customer_ID}_${Date.now()}.jpg`;
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, buffer);

      const relativePath = `/id-uploads/${filename}`;

      try {
        const newCustomer = await customerService.addCustomer({
          customer_ID: body.customer.customer_ID,
          payment_ID: newPayment.payment_ID,
          number_of_PAX: body.customer.number_of_PAX,
          date_of_travel: new Date(body.customer.date_of_travel),
          number_of_luggage: body.customer.number_of_luggage,
          ID_Picture: relativePath,
        });

        console.log("NEW CUSTOMER: ", newCustomer);

        // insert to custom itinerary
        try {
          const newCustomItinerary =
            await customItineraryService.addCustomItinerary({
              custom_ID: newItinerary.itinerary_ID,
              is_made_by_customer: newCustomer.customer_ID,
            });

          console.log("NEW CUSTOM ITINERARY: ", newCustomItinerary);

          const travelDate = new Date(body.customer.date_of_travel);

          const withTime = (base: Date, hm: string) => {
            const [h, m, s] = hm.split(":").map((n) => Number(n));
            const d = new Date(base); // clone! Dates are mutable
            d.setHours(h || 0, m || 0, s || 0, 0);
            return d;
          };

          // assuming body.customer.time_for_pickup / time_for_dropoff are "HH:mm"
          const pickup = withTime(
            travelDate,
            String(body.customer.time_for_pickup)
          );
          const dropoff = withTime(
            travelDate,
            String(body.customer.time_for_dropoff)
          );

          // insert to order details
          try {
            const newOrder = await orderDetailsService.addCustomOrderDetails({
              customer_ID: body.customer.customer_ID,
              payment_ID: newPayment.payment_ID,
              itinerary_ID: newItinerary.itinerary_ID,
              number_of_PAX: body.customer.number_of_PAX,
              date_of_travel: travelDate,
              time_for_pickup: pickup,
              time_for_dropoff: dropoff,
            });

            console.log("NEW ORDER: ", newOrder);

            // insert into locations
            const locations = body.locations;
            const locIDarr = [];

            for (const l of locations) {
              if (l.isCustom) {
                try {
                  const newLocation = await locationsService.addLocation({
                    location_name: l.name,
                    location_address: l.address,
                    lng: l.lng,
                    lat: l.lat,
                    is_custom_made: true,
                  });

                  locIDarr.push(newLocation.location_ID);
                } catch (error) {
                  console.error("Error inserting custom location: ", error);
                  return NextResponse.json(
                    { error: `${error}` },
                    { status: 500 }
                  );
                }
              } else {
                const newLocation = await locationsService.getLocation(l.name);
                if (newLocation) {
                  locIDarr.push(newLocation[0].location_ID);
                } else {
                  console.error("Could not find preset location.");
                  return NextResponse.json(
                    { error: "Could not find preset location." },
                    { status: 500 }
                  );
                }
              }
            }

            // insert to itinerary stops
            let stop_order = 1;
            for (const l of locIDarr) {
              try {
                const newStop = itineraryStopsService.addItineraryStop({
                  custom_ID: newItinerary.itinerary_ID,
                  location_ID: l,
                  stop_order,
                });
                stop_order++;
              } catch (error) {
                console.error("Error inserting itinerary stop: ", error);
                return NextResponse.json(
                  { error: `${error}` },
                  { status: 500 }
                );
              }
            }

            return NextResponse.json(
              { message: "success", order_ID: newOrder.order_ID },
              { status: 200 }
            );
          } catch (error) {
            console.error("Error inserting order details: ", error);
            return NextResponse.json({ error: `${error}` }, { status: 500 });
          }
        } catch (error) {
          console.error("Error inserting custom itinerary: ", error);
          return NextResponse.json({ error: `${error}` }, { status: 500 });
        }
      } catch (error) {
        console.error("Error inserting customer: ", error);
        return NextResponse.json({ error: `${error}` }, { status: 500 });
      }
    } catch (error) {
      console.error("Error inserting itinerary: ", error);
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  } catch (error) {
    console.error("Error inserting payment: ", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
