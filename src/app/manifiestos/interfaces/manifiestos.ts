export interface Manifiesto {
  seq:        string;
  modelo:     string;
  Folio:      string;
  Fecha:      string;
  Escaner:    string;
  NumSerie:   string;
  materiales: Material[];
}

export interface Material {
  Parte: string;
}

