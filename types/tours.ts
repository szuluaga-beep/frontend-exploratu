export interface Tour {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
  /** Decimal string from backend, e.g. "100000.00" */
  pricePerPerson: string;
  maxCapacity: number;
  categoryId: number;
  cityId: number;
  createdAt: string;
  updatedAt: string;
}
