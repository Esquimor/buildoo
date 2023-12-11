import { WorkType } from '@shared-type';
import { DateRangeType } from 'react-tailwindcss-datepicker';
import * as z from 'zod';

export const intervention = z.object({
  name: z.string(),
  start_date: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  end_date: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  contractor: z.object({
    id: z.string().optional(),
    name: z.string()
  }),
  interventionPayment: z.array(z.object({
    amountHT: z.string(),
    amountTTC: z.string(),
    payment_date: z.object({
      startDate: z.string(),
      endDate: z.string(),
    }),
    interventionPaymentCondition: z.array(z.object({
      condition: z.string()
    })).optional()
  })).optional()
})

export const schema = z.object({
  name: z.string(),
  start_date: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  end_date: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
  type: z.nativeEnum(WorkType),
  interventions: z.array(intervention).optional(),
})

export type InterventionPaymentCondition = {
  condition: string;
}

export type InterventionPayment = {
  amountHT: string;
  amountTTC: string;
  payment_date: DateRangeType;
  interventionPaymentCondition: InterventionPaymentCondition[]
}

export type Intervention = {
  name: string;
  start_date: DateRangeType;
  end_date: DateRangeType;
  contractor: {
    id?: string;
    name: string;
  }
  interventionPayment: InterventionPayment[]
}

export type FormValues = {
  name: string;
  start_date: DateRangeType;
  end_date: DateRangeType;
  type: WorkType;
  description?: string;
  interventions?: Intervention[]
}

export const interventionDefault: Intervention = {
  name: "",
  start_date: {
    startDate: null,
    endDate: null
  },
  end_date: {
    startDate: null,
    endDate: null
  },
  contractor: {
    name: "",
  },
  interventionPayment: []
}