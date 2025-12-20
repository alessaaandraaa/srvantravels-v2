import { NextResponse } from "next/server";
import CustomerService from "@/services/customer-service";
import OrderDetailsService from "@/services/orderdetails-service";
import PaymentService from "@/services/payment-service";
import CustomItineraryService from "@/services/custom-itinerary-service";
import ItineraryService from "@/services/itinerary-service";
import ItineraryStopsService from "@/services/itinerary-stops-service";
import LocationsService from "@/services/locations-service";
import { put } from "@vercel/blob";

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
    /* ---------- PAYMENT ---------- */
    const newPayment = await paymentService.addPayment(body.payment);

    /* ---------- ITINERARY ---------- */
    try {
      console.log(
        "Itinerary data:",
        body.itinerary.price,
        body.itinerary.type
      );

      const newItinerary = await itineraryService.addItinerary({
        price: body.itinerary.price,
        type: body.itinerary.type,
      });

      /* ---------- ID IMAGE (VERCEL BLOB) ---------- */
      let relativePath: string | null = null;

      if (body.customer.ID_PictureB64) {
        const base64Data = body.customer.ID_PictureB64.replace(
          /^data:image\/\w+;base64,/,
          ""
        );

        const buffer = Buffer.from(base64Data, "base64");
        const filename = `id_${body.customer.customer_id}_${Date.now()}.jpg`;

        try {
          const blob = await put(`id-uploads/${filename}`, buffer, {
            access: "public",
            contentType: "image/jpeg",
          });

          relativePath = blob.url;
        } catch (error) {
          console.error("Upload failed:", error);
          return NextResponse.json(
            { error: "Image upload failed" },
            { status: 500 }
          );
        }
      }

      /* ---------- REQUIRED IMAGE GUARD ---------- */
      if (!relativePath) {
        return NextResponse.json(
          { error: "ID picture is required" },
          { status: 400 }
        );
      }

      /* ---------- CUSTOMER ---------- */
      try {
        const newCustomer = await customerService.addCustomer({
          customer_ID: body.customer.customer_id,
          payment_ID: newPayment.payment_ID,
          number_of_PAX: body.customer.number_of_PAX,
          date_of_travel: new Date(body.customer.date_of_travel),
          number_of_luggage: body.customer.number_of_luggage,
          ID_Picture: relativePath, // ✅ now always string
        });

        /* ---------- CUSTOM ITINERARY ---------- */
        try {
          await customItineraryService.addCustomItinerary({
            custom_ID: newItinerary.itinerary_ID,
            is_made_by_customer: newCustomer.customer_ID,
          });

          const travelDate = new Date(body.customer.date_of_travel);

          const withTime = (base: Date, hm?: string) => {
            if (!hm) return null;
            const [h, m, s] = hm.split(":").map(Number);
            const d = new Date(base);
            d.setHours(h || 0, m || 0, s || 0, 0);
            return d;
          };

          const pickup = withTime(
            travelDate,
            body.customer.time_for_pickup
          );

          const dropoff = body.customer.time_for_dropoff
            ? withTime(travelDate, body.customer.time_for_dropoff)
            : null;

          /* ---------- ORDER DETAILS ---------- */
          try {
            const newOrder =
              await orderDetailsService.addCustomOrderDetails({
                customer_ID: body.customer.customer_id,
                payment_ID: newPayment.payment_ID,
                itinerary_ID: newItinerary.itinerary_ID,
                number_of_PAX: body.customer.number_of_PAX,
                date_of_travel: travelDate,
                time_for_pickup: pickup,
                time_for_dropoff: dropoff,
              });

            /* ---------- LOCATIONS ---------- */
            const locations = body.locations;
            const locIDarr: number[] = [];

            for (const l of locations) {
              if (l.isCustom) {
                try {
                  const newLocation =
                    await locationsService.addLocation({
                      location_name: l.name,
                      location_address: l.address,
                      lng: l.lng,
                      lat: l.lat,
                      is_custom_made: true,
                    });

                  locIDarr.push(newLocation.location_ID);
                } catch (error) {
                  console.error("Error inserting custom location:", error);
                  return NextResponse.json(
                    { error: `${error}` },
                    { status: 500 }
                  );
                }
              } else {
                const preset = await locationsService.getLocation(l.name);
                if (preset) {
                  locIDarr.push(preset[0].location_ID);
                } else {
                  return NextResponse.json(
                    { error: "Could not find preset location." },
                    { status: 500 }
                  );
                }
              }
            }

            /* ---------- ITINERARY STOPS ---------- */
            let stop_order = 1;
            for (const locID of locIDarr) {
              try {
                await itineraryStopsService.addItineraryStop({
                  custom_ID: newItinerary.itinerary_ID,
                  location_ID: locID,
                  stop_order,
                });
                stop_order++;
              } catch (error) {
                console.error("Error inserting itinerary stop:", error);
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
            console.error("Error inserting order details:", error);
            return NextResponse.json({ error: `${error}` }, { status: 500 });
          }
        } catch (error) {
          console.error("Error inserting custom itinerary:", error);
          return NextResponse.json({ error: `${error}` }, { status: 500 });
        }
      } catch (error) {
        console.error("Error inserting customer:", error);
        return NextResponse.json({ error: `${error}` }, { status: 500 });
      }
    } catch (error) {
      console.error("Error inserting itinerary:", error);
      return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
  } catch (error) {
    console.error("Error inserting payment:", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
