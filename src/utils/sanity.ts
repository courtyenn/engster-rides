import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import { sanityClient } from "sanity:client";
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
  checkoutUrl: string;
  size: string;
  fit: string;
  color: ShirtColor;
  images: DumbImageAssetWrapper[];
}

export interface Accessory extends BaseProduct {
  _type: "accessory";
  images: DumbImageAssetWrapper[];
  checkoutUrl: string;
}

export interface Auction extends BaseProduct {
  _type: "auction";
  images: DumbImageAssetWrapper[];
  checkoutUrl: string;
  sold: boolean;
}
export interface DumbImageAssetWrapper {
  asset: ImageAsset;
  alt: string;
}

export async function getShirts(): Promise<Shirt[]> {
  return await sanityClient.fetch(
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
        checkoutUrl,
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
  return await sanityClient.fetch(
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
        checkoutUrl,
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
  return await sanityClient.fetch(
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
  return await sanityClient.fetch(
    groq`*[_type == "auction"] | order(sold, _createdAt asc){
      name,
      excerpt,
      description,
      discountPrice,
      price,
      weight,
      sold,
      checkoutUrl,
      images[] {
        alt,
        asset->
      }
    }`,
  );
}

export type Blog = {
  title: string;
  slug: Slug;
  summary: string;
  content: PortableTextBlock[];
  image: DumbImageAssetWrapper;
};
export async function getBlogs(): Promise<Blog[]> {
  return await sanityClient.fetch(
    groq`*[_type == "blog"]{
      title,
      slug,
      summary,
      content,
      image {
        alt,
        asset->
      }
    }`,
  );
}

export async function getBlog(slug: string): Promise<Blog> {
  return await sanityClient.fetch(
    groq`*[_type == "blog"  && slug.current == "${slug}"][0]{
      title,
      slug,
      summary,
      content,
      image {
        alt,
        asset->
      }
    }`,
  );
}
//
