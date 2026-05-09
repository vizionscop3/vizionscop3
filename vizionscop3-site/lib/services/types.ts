export type ServiceCategory =
  | "web"
  | "mobile"
  | "software"
  | "ai"
  | "database"
  | "consulting";

export interface Service {
  id: ServiceCategory;
  name: string;
  shortDescription: string;
  icon: string;
  order: number;
}
