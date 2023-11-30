import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Label, Sidebar } from "@shared-ui";
import { SelectfieldController } from "apps/web/app/_components/form/selectfieldController";
import { TextfieldController } from "apps/web/app/_components/form/textfieldController";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as z from 'zod';
import { ContractorType } from "@shared-type"
import { DatepickerController } from "apps/web/app/_components/form/datapickerController";
import { trpc } from "apps/web/app/trpc";
import { FileUploadController } from "apps/web/app/_components/form/fileUploadController/fileUploadController";

type FormValues = {
  name: string;
  type: string;
  decennial_civil_liability: File;
  contractorPayment: {
    amountHT: string;
    amountTTC: string;
    datePayment: {
      startDate: string;
      endDate: string;
    };
    contractorPaymentCondition: {
      condition: string;
    }[]
  }[]
}

interface SidepanelAddContractorProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

export function SidepanelAddContractor({
  open,
  onClose,
  projectId,
}: SidepanelAddContractorProps) {

  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    type: z.string().min(1, { message: "Required" }),
    decennial_civil_liability: z.instanceof(File),
    contractorPayment: z.array(z.object({
      amountHT: z.string(),
      amountTTC: z.string(),
      datePayment: z.object({
        startDate: z.string(),
        endDate: z.string(),
      }),
      contractorPaymentCondition: z.array(z.object({
        condition: z.string()
      })).optional()
    }))
  })

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: ContractorType.Unknow,
      contractorPayment: [
        {
          amountHT: "",
          amountTTC: "",
        }
      ]
    }
  });


  const createContractor =  trpc.contractor.create.useMutation({
    onSuccess() {
      onClose()
    }
  });

  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onSubmit = async (values: FormValues) => {
    createContractor.mutate({
      ...values, 
      projectId,
      decennial_civil_liability: await toBase64(values.decennial_civil_liability)as string,
      contractorPayment: values.contractorPayment.map(contractorPayment => ({
        ...contractorPayment,
        amountHT: +contractorPayment.amountHT,
        amountTTC: +contractorPayment.amountTTC,
        datePayment: contractorPayment.datePayment.startDate
      }))
    });
  }

  const typeValues = Object.values(ContractorType).map(type => ({
    id: type,
    label: type
  }));

  const { fields: fieldsPayment, append: appendPayment, remove: removePayment } = useFieldArray({
    control: formMethods.control,
    name: "contractorPayment"
  });

  return (
    <Sidebar
      open={open}
      onClickOutside={onClose}
      width="1200px"
    >
      <form
        className="h-full overflow-scroll"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormProvider {...formMethods}>
          <div
            className="flex flex-col h-full"
          >
            <header
              className="bg-blue-800 text-white p-4"
            >
              <Label label="Add a contractor" size="text-2xl" color="text-white" />
            </header>
            <main
              className="grow p-4 flex flex-col"
            >
              <section>
                <Label
                  label="Général"
                  size="text-2xl"
                  weight="font-bold"
                  className="mb-2"
                />
                <div
                  className="grid grid-cols-2 gap-4"
                >
                  <TextfieldController
                    name="name"
                    labelProps={{
                      label: "Name"
                    }}
                  />
                  <SelectfieldController
                    name="type"
                    labelProps={{
                      label: "Type"
                    }}
                    selectProps={{
                      values: typeValues
                    }}
                  />
                </div>
                <div
                  className="grid grid-cols-2 gap-4"
                >
                  <FileUploadController
                    name="decennial_civil_liability"
                    labelProps={{
                      label: "Rc décennal"
                    }}
                    fileUploadProps={{
                      helpText: "Pdf only"
                    }}
                  />
                </div>
              </section>
              <section>
                <Label
                  label="Paiement"
                  size="text-2xl"
                  weight="font-bold"
                  className="mb-2"
                />
                {fieldsPayment.map((field, index) => (
                  <Card
                    className="flex flex-col mb-4"
                    key={field.id}
                  >
                    <div
                      className="grid grid-cols-2 gap-4 w-full"
                    >
                      <TextfieldController
                        name={`contractorPayment.${index}.amountHT`}
                        labelProps={{
                          label: "Amount HT"
                        }}
                      />
                      <TextfieldController
                        name={`contractorPayment.${index}.amountTTC`}
                        labelProps={{
                          label: "Price TTC"
                        }}
                      />
                      <DatepickerController
                        name={`contractorPayment.${index}.datePayment`}
                        labelProps={{
                          label: "Date Paiment"
                        }}
                      />
                    </div>
                    <div
                      className="flex justify-end"
                    >
                      <Button
                        label="Delete"
                        color="red"
                        onClick={() => removePayment(index)}
                      />
                    </div>
                  </Card>
                ))}
                <div
                  className="flex justify-start"
                >
                  <Button
                    label="Add Payment"
                    color="blue"
                    onClick={() => appendPayment({
                      amountHT: "",
                      amountTTC: "",
                      datePayment: {
                        startDate: "",
                        endDate: ""
                      },
                      contractorPaymentCondition: []
                    })}
                  />
                </div>
              </section>
            </main>
            <footer
              className="border-t-2 border-t-gray-4300 py-4 px-8 flex justify-end sticky bottom-0 bg-white"
            >
              <Button
                label="Cancel"
                color="gray"
                className="mr-6"
                onClick={onClose}
              />
              <Button
                label="Create"
                onClick={formMethods.handleSubmit(onSubmit)}
                type="submit"
              />
            </footer>
          </div>
        </FormProvider>
      </form>
    </Sidebar>
  )
}