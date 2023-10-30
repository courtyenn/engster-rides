import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await useSanityClient().fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    },
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}

export async function getShirts(): Promise<Shirt[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "shirt" && defined(slug.current) && inStock == true]{
      slug,
      name,
      excerpt,
      description,
      price,
      variants[]-> {
        name,
        sku,
        size,
        fit,
        color->,
        images[] {
          asset->
        }
      }
    }`,
  );
}

export async function getShirt(slug: string): Promise<Shirt> {
  return await useSanityClient().fetch(
    groq`*[_type == "shirt" && slug.current == "${slug}"][0]
    {
      slug,
      name,
      excerpt,
      description,
      price,
      variants[]-> {
        name,
        sku,
        size,
        fit,
        color->,
        images[] {
          asset->
        }
      }
    }`,
  );
}

export interface ShirtColor {
  _type: "shirtColor";
  _createdAt: string;
  colorName: string;
  color: {
    hex: string;
  };
}

export interface DumbImageAssetWrapper {
  asset: ImageAsset;
}
export interface ShirtVariant {
  _type: "shirtVariant";
  _createdAt: string;
  name: string;
  sku: string;
  size: string;
  fit: string;
  color: ShirtColor;
  images: DumbImageAssetWrapper[];
}
export interface Shirt {
  _type: "shirt";
  _createdAt: string;
  name: string;
  slug: Slug;
  excerpt: string;
  images: ImageAsset[];
  description: PortableTextBlock[];
  price: number;
  variants: ShirtVariant[];
}

export async function getAbout(): Promise<Page> {
  return await useSanityClient().fetch(
    groq`*[_type == "page" && title == "About"][0]`,
  );
}

export interface Page {
  _type: "page";
  _createdAt: string;
  title: string;
  slug: Slug;
  mainImage: ImageAsset;
  body: PortableTextBlock[];
}
