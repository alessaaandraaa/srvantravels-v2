import { Checkbox } from "../../../../../components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../../../../../../components/ui/field";
import { Textarea } from "../../../../../../components/ui/textarea";
import { Button } from "../button";
import { Input } from "../input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";


const AdminViewLocation = () => {
    return (
         <div className="">
            <form>
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Location Information</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                        Location Name
                      </FieldLabel>
                      <Input
                        id="checkout-7j9-card-name-43j"
                        placeholder="Evil Rabbit"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                        Location Address
                      </FieldLabel>
                      <Input
                        id="checkout-7j9-card-number-uw1"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </form>
         </div>
    )
}

export default AdminViewLocation;