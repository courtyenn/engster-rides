import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getShirts(): Promise<Shirt[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "shirt" && defined(slug.current) && inStock == true]{
      slug,
      name,
      excerpt,
      description,
      discountPrice,
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
      discountPrice,
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
  description: PortableTextBlock[];
  price: number;
  variants: ShirtVariant[];
  discountPrice: number;
}

export interface Accessory {
  _type: "accessory";
  name: string;
  slug: Slug;
  excerpt: string;
  images: DumbImageAssetWrapper[];
  description: PortableTextBlock[];
  price: number;
}

export async function getAccessories(): Promise<Accessory[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "accessory" && inStock == true]{
      name,
      excerpt,
      description,
      discountPrice,
      price,
      weight,
      inStock,
      images[] {
        alt,
        asset->
      }
    }`,
  );
}
