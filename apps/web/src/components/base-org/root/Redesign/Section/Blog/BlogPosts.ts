export type BlogPost = {
  title: string;
  subtitle: string;
  previewImage: string;
  href: string;
  /** When ascii efect is enabled, edit these values to change the brightness and contrast of the image */
  brightness: number;
  contrast: number;
};

export const blogPosts: BlogPost[] = [];
