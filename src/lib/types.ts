export type GradientPoint = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export type Mesh = {
  id?: number;
  base: string;
  gradients: GradientPoint[];
  preset: string;
};
