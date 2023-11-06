import type { App } from "vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  RiTShirtAirFill,
  RiTShirtAirLine,
  RiTShirt2Line,
  RiTShirt2Fill,
  PrShoppingCart,
  PrInstagram,
  CoTiktok,
  RiFacebookFill,
  RiLoader5Fill,
} from "oh-vue-icons/icons";

addIcons(
  RiTShirtAirFill,
  RiTShirtAirLine,
  RiTShirt2Line,
  RiTShirt2Fill,
  PrShoppingCart,
  PrInstagram,
  CoTiktok,
  RiFacebookFill,
  RiLoader5Fill,
);
export default (app: App) => {
  app.component("v-icon", OhVueIcon);
  // setup vue components and stuff here
};
