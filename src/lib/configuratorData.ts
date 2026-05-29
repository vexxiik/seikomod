export type ConfiguratorCategory = "case" | "dial" | "hands" | "bracelet";

export interface ConfiguratorPart {
  id: string;
  name: string;
  price: number; // additional cost if any
  image: string; // The transparent layer
  thumbnail: string; // The thumbnail for the grid
  style?: { scale: number; x: number; y: number }; // Calibration overrides
}

export interface ConfiguratorData {
  category: ConfiguratorCategory;
  title: string;
  options: ConfiguratorPart[];
}

export const configuratorData: ConfiguratorData[] = [
  {
    category: "bracelet",
    title: "Řemínky",
    options: [
      {
        id: "strap-oyster",
        name: "Oyster Steel",
        price: 0,
        image: "/configurator/silver-oyster-bracelet.jpg",
        thumbnail: "/configurator/silver-oyster-bracelet.jpg",
        style: { scale: 1.29, x: -0.5, y: 0.0 }
      },
      {
        id: "strap-jubilee",
        name: "Jubilee Steel",
        price: 1500,
        image: "/configurator/silver-jubilee-bracelet.jpg",
        thumbnail: "/configurator/silver-jubilee-bracelet.jpg",
        style: { scale: 1.29, x: -0.5, y: 0.0 }
      },
      {
        id: "strap-oyster-gold",
        name: "Oyster Two-Tone Gold",
        price: 2500,
        image: "/configurator/silver-gold-oyster-bracelet.jpg",
        thumbnail: "/configurator/silver-gold-oyster-bracelet.jpg",
        style: { scale: 1.29, x: -0.5, y: 0.0 }
      }
    ]
  },
  {
    category: "case",
    title: "Pouzdra",
    options: [
      {
        id: "case-dj",
        name: "Datejust 41mm (Smooth)",
        price: 0,
        image: "/configurator/silver-dj-case.jpg",
        thumbnail: "/configurator/silver-dj-case.jpg",
        style: { scale: 0.83, x: 0.0, y: 0.0 }
      },
      {
        id: "case-dj-39",
        name: "Datejust 39mm (Fluted)",
        price: 500,
        image: "/configurator/silver-dj-39-case.jpg",
        thumbnail: "/configurator/silver-dj-39-case.jpg",
        style: { scale: 0.83, x: 0.0, y: 0.0 }
      },
      {
        id: "case-sub",
        name: "Submariner Style",
        price: 1200,
        image: "/configurator/silver-sub-case.jpg",
        thumbnail: "/configurator/silver-sub-case.jpg",
        style: { scale: 0.83, x: 0.0, y: 0.0 }
      },
      {
        id: "case-nautilus",
        name: "Nautilus Steel",
        price: 2000,
        image: "/configurator/silver-nautilus-case.jpg",
        thumbnail: "/configurator/silver-nautilus-case.jpg",
        style: { scale: 0.83, x: 0.0, y: 0.0 }
      },
      {
        id: "case-nautilus-gold",
        name: "Nautilus Gold",
        price: 3500,
        image: "/configurator/gold-nautilus-case.jpg",
        thumbnail: "/configurator/gold-nautilus-case.jpg",
        style: { scale: 0.83, x: 0.0, y: 0.0 }
      }
    ]
  },
  {
    category: "dial",
    title: "Ciferníky",
    options: [
      {
        id: "dial-blue",
        name: "Seiko Blue Sunburst",
        price: 0,
        image: "/configurator/seiko-blue-dial.jpg",
        thumbnail: "/configurator/seiko-blue-dial.jpg",
        style: { scale: 0.44, x: -2.0, y: -0.5 }
      },
      {
        id: "dial-green",
        name: "Seiko Green Sub",
        price: 0,
        image: "/configurator/seiko-green-dial.jpg",
        thumbnail: "/configurator/seiko-green-dial.jpg",
        style: { scale: 0.44, x: -2.0, y: -0.5 }
      },
      {
        id: "dial-grey",
        name: "Seiko Meteorite Grey",
        price: 1500,
        image: "/configurator/seiko-grey-dial.jpg",
        thumbnail: "/configurator/seiko-grey-dial.jpg",
        style: { scale: 0.44, x: -2.0, y: -0.5 }
      },
      {
        id: "dial-who-cares",
        name: "Who Cares Edition",
        price: 1000,
        image: "/configurator/seiko-who-cares-dial.jpg",
        thumbnail: "/configurator/seiko-who-cares-dial.jpg",
        style: { scale: 0.44, x: -2.0, y: -0.5 }
      },
      {
        id: "dial-open",
        name: "Open Heart Skeleton",
        price: 2500,
        image: "/configurator/seiko-open-dial.jpg",
        thumbnail: "/configurator/seiko-open-dial.jpg",
        style: { scale: 0.44, x: -2.0, y: -0.5 }
      }
    ]
  },
  {
    category: "hands",
    title: "Ručičky",
    options: [
      {
        id: "hands-silver",
        name: "Classic Silver",
        price: 0,
        image: "/configurator/silver-hands.jpg",
        thumbnail: "/configurator/silver-hands.jpg",
        style: { scale: 0.31, x: 2.5, y: -16.0 }
      },
      {
        id: "hands-black",
        name: "Sport Black",
        price: 200,
        image: "/configurator/black-hands.jpg",
        thumbnail: "/configurator/black-hands.jpg",
        style: { scale: 0.31, x: 2.5, y: -16.0 }
      }
    ]
  }
];

export const BASE_WATCH_PRICE = 4990;
