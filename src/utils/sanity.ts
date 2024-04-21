import { useSanityClient } from "@sanity/astro";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

interface BaseSanity {
  _type: string;
  _createdAt: string;
}

interface BaseProduct extends BaseSanity {
  name: string;
  slug: Slug;
  excerpt: string;
  description: PortableTextBlock[];
  price: number;
  checkoutUrl: string;
}

export interface Shirt extends BaseProduct {
  _type: "shirt";
  variants: ShirtVariant[];
  discountPrice: number;
}

export interface ShirtColor extends BaseSanity {
  _type: "shirtColor";
  colorName: string;
  color: {
    hex: string;
  };
}

export interface ShirtVariant extends BaseSanity {
  _type: "shirtVariant";
  name: string;
  sku: string;
  size: string;
  fit: string;
  color: ShirtColor;
  images: DumbImageAssetWrapper[];
}

export interface Accessory extends BaseProduct {
  _type: "accessory";
  images: DumbImageAssetWrapper[];
}

export interface Auction extends BaseProduct {
  _type: "auction";
  images: DumbImageAssetWrapper[];
}
export interface DumbImageAssetWrapper {
  asset: ImageAsset;
}

export async function getShirts(): Promise<Shirt[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "shirt" && defined(slug.current) && inStock == true]{
      slug,
      name,
      excerpt,
      description,
      discountPrice,
      price,
      checkoutUrl,
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
      checkoutUrl,
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
      checkoutUrl,
      images[] {
        alt,
        asset->
      }
    }`,
  );
}

export async function getAuctions(): Promise<Auction[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "auction"]{
      name,
      excerpt,
      description,
      discountPrice,
      price,
      weight,
      hasSold,
      checkoutUrl,
      images[] {
        alt,
        asset->
      }
    }`,
  );
}
