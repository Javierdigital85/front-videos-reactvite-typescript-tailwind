// src/lite-youtube.d.ts

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        videoid: string;
        videotitle: string;
        posterquality?: string;
      };
    }
  }
}

export {}; // Esto asegura que el archivo se trate como un módulo
