export type StoreVariant = {
  id: string;
  label: string;
  price: number;
  compareAt?: number;
  image?: string;
};

export type ProductCategory =
  | "Cutting Templates"
  | "Quilting Guides"
  | "Cutting Mats"
  | "Quilting Rulers";

export type Product = {
  handle: string;
  title: string;
  category: ProductCategory;
  description: string;
  price: number;
  compareAt?: number;
  saleBadge?: string;
  image: string;
  images: string[];
  features: string[];
  variants?: StoreVariant[];
  digital?: boolean;
};

const cdn = "https://cdn.shopify.com/s/files/1/0702/6704/4026/files/";

export const products: Product[] = [
  {
    handle: "5-in-1-quilt-cutting-template",
    title: "5 In 1 Slotted Quilt Cutting Template",
    category: "Cutting Templates",
    description:
      "Craft with laser-like precision. This versatile 5-in-1 fabric template brings multiple shapes and clear grid markings together in one quilting tool. Its slotted design lets you cut up to six 2-inch strips or twelve 1-inch strips without moving the ruler, helping make measuring and cutting feel more considered.",
    price: 29.99,
    compareAt: 80,
    saleBadge: "SAVE 62%",
    image: `${cdn}5b3646df-37ba-4d39-a3bd-50ee0bafa51a.jpg?v=1743701144`,
    images: [
      `${cdn}5b3646df-37ba-4d39-a3bd-50ee0bafa51a.jpg?v=1743701144`,
      `${cdn}b7b06942-cf84-41c6-b47c-b68b2e70bdde_8216a5ab-e2dc-44d9-aef9-a2244ea4d814.jpg?v=1743701144`,
      `${cdn}b1e8a3b9-7f83-487a-9416-6222fd7f8d81_0d848415-7fc2-4e67-91ab-d4fb5745f33d.jpg?v=1743701144`,
      `${cdn}2f9a85c7-648c-4114-9834-2563efcabc94.jpg?v=1743701144`,
      `${cdn}7f7dba84-ade9-48fa-9f59-8a141910abf0_7c7fd467-b45a-49ab-9237-3301561825d8.jpg?v=1743701144`,
      `${cdn}f85f28df-8bbe-4ea9-936b-91ae71d4fadf_6b5d73f7-81e1-4817-8d27-34b67e9c7bf0.jpg?v=1743701144`,
      `${cdn}a58f634c-a110-47e1-9c8b-8dcc9464c497.jpg?v=1743701144`,
      `${cdn}a0ccd724-0965-49f7-9891-af93e9d799e5_4d928cd0-e936-485b-8e1f-35d3ec0e0a1b.jpg?v=1743701144`,
    ],
    features: [
      "Clear grid markings and multiple shapes in one template",
      "Use with a rotary cutter to guide fabric cuts",
      "Angle markings for 30°, 45° and 60° cuts",
      "Cut up to six 2-inch or twelve 1-inch strips without moving the ruler",
    ],
    variants: [
      {
        id: "template-regular-6",
        label: "Regular · 6 inches",
        price: 29.99,
        compareAt: 80,
      },
      {
        id: "template-large-12",
        label: "Large · 12 inches",
        price: 49.99,
        compareAt: 120,
      },
      {
        id: "template-combo-guides",
        label: "Regular + Large with free quilting guides",
        price: 79.99,
        compareAt: 199,
      },
    ],
  },
  {
    handle: "the-vintage-log-cabin-quilt-guide",
    title: "The Vintage Log Cabin Quilt Guide",
    category: "Quilting Guides",
    description:
      "Master the art of precise block assembly with this step-by-step Vintage Log Cabin Quilt Guide. The instructions are designed to make each log cabin block easier to plan and piece together, whether you are beginning a quilt or returning to a favorite pattern.",
    price: 7.99,
    image: `${cdn}Group_1261153690_1-5622857.png?v=1743701218`,
    images: [`${cdn}Group_1261153690_1-5622857.png?v=1743701218`],
    features: [
      "Step-by-step guidance for log cabin block assembly",
      "Helps make fabric placement and alignment easier to follow",
      "Written for beginner and experienced quilters",
    ],
    digital: true,
  },
  {
    handle: "the-ultimate-quilt-chart-1",
    title: "The Ultimate Quilt Chart",
    category: "Quilting Guides",
    description:
      "Unlock the art of precision cutting with The Ultimate Quilt Chart. Clear, step-by-step instructions help take the guesswork out of fabric cutting for complex patterns and simple patchwork alike, so fabric edges can align with greater clarity.",
    price: 9.99,
    image: `${cdn}1558_The-Ultimate-Quilt-Chart_1_1-8018768_d0f3e01c-3e32-4c93-a5e7-f9e72c216c6a.webp?v=1743701172`,
    images: [`${cdn}1558_The-Ultimate-Quilt-Chart_1_1-8018768_d0f3e01c-3e32-4c93-a5e7-f9e72c216c6a.webp?v=1743701172`],
    features: [
      "Clear, step-by-step cutting guidance",
      "For complex patterns and simple patchwork projects",
      "Helps you plan fabric cuts with greater confidence",
    ],
    digital: true,
  },
  {
    handle: "quilters-cutting-mat",
    title: "Quilters Cutting Mat",
    category: "Cutting Mats",
    description:
      "A durable, five-layer self-healing cutting surface for quilting, sewing and other creative projects. The dual-sided mat features measurement grids and angle lines to help keep your work measured and organized.",
    price: 49.95,
    compareAt: 100,
    saleBadge: "SAVE 50%",
    image: `${cdn}q1.jpg?v=1743701295`,
    images: [
      `${cdn}q1.jpg?v=1743701295`,
      `${cdn}q8.jpg?v=1743701296`,
      `${cdn}q4.jpg?v=1743701296`,
      `${cdn}q3.jpg?v=1743701296`,
      `${cdn}q6.jpg?v=1743701296`,
      `${cdn}q7.jpg?v=1743701296`,
      `${cdn}download_-_2025-09-23T213951.586.jpg?v=1758646415`,
      `${cdn}download_-_2025-09-23T213954.254.jpg?v=1758646415`,
      `${cdn}download_-_2025-09-23T213953.145.jpg?v=1758646542`,
      `${cdn}download_-_2025-09-23T213951.952.jpg?v=1758646542`,
    ],
    features: [
      "Dual-sided design with metric and imperial measurements",
      "Grid markings and 30°, 45° and 60° angle lines",
      "Five-layer self-healing surface",
      "Available in A4, A3, A2 and A1 sizes",
    ],
    variants: [
      {
        id: "mat-a4",
        label: "A4 · 30 × 22 cm",
        price: 49.95,
        compareAt: 100,
        image: `${cdn}download_-_2025-09-23T213951.952.jpg?v=1758646542`,
      },
      {
        id: "mat-a3",
        label: "A3 · 45 × 30 cm",
        price: 59.95,
        compareAt: 150,
        image: `${cdn}download_-_2025-09-23T213953.145.jpg?v=1758646542`,
      },
      {
        id: "mat-a2",
        label: "A2 · 60 × 45 cm",
        price: 79.95,
        compareAt: 100,
        image: `${cdn}download_-_2025-09-23T213954.254.jpg?v=1758646415`,
      },
      {
        id: "mat-a1",
        label: "A1 · 90 × 60 cm",
        price: 99.95,
        compareAt: 200,
        image: `${cdn}download_-_2025-09-23T213951.586.jpg?v=1758646415`,
      },
    ],
  },
  {
    handle: "the-ultimate-quilt-chart",
    title: "The Ultimate Quilt Guide",
    category: "Quilting Guides",
    description:
      "The Ultimate Quilt Guide helps simplify yardage calculations and quilt-size selections. Its easy-to-follow charts and tips are designed to help you work out how much fabric a project calls for, from a cozy lap quilt to a larger bedspread.",
    price: 9.99,
    image: `${cdn}single_book_mokup-1234_1-8994960.png?v=1743701239`,
    images: [`${cdn}single_book_mokup-1234_1-8994960.png?v=1743701239`],
    features: [
      "Guidance for fabric yardage calculations",
      "Quilt-size selections for a range of projects",
      "Easy-to-follow charts and tips",
    ],
    digital: true,
  },
  {
    handle: "the-diamond-tides-quilting-guide",
    title: "The Diamond Tides Quilting Guide",
    category: "Quilting Guides",
    description:
      "The Diamond Tides Quilting Guide pairs step-by-step instructions with detailed diagrams to make pattern planning easier to follow. A practical guide for quilters who want to work through each block with more clarity.",
    price: 7.99,
    image: `${cdn}Group_1261153692_1-5622856.png?v=1743701194`,
    images: [`${cdn}Group_1261153692_1-5622856.png?v=1743701194`],
    features: [
      "Step-by-step instructions with detailed diagrams",
      "Guidance for working through quilt blocks",
      "Suitable for beginning and experienced quilters",
    ],
    digital: true,
  },
  {
    handle: "ruleaxis",
    title: "RuleAxis – Quilting Seam Measuring Ruler",
    category: "Quilting Rulers",
    description:
      "RuleAxis is a quilting seam measuring ruler designed to help sewists measure seams and check seam allowances. Clear markings support measuring, aligning and checking work on patchwork and sewing projects.",
    price: 24.99,
    image: `${cdn}S06ed230e9be048548909284aceae3db7u.webp?v=1769598483`,
    images: [
      `${cdn}S06ed230e9be048548909284aceae3db7u.webp?v=1769598483`,
      `${cdn}S38fc1b939af7475b95579418a17f8e00a.webp?v=1769598483`,
      `${cdn}Sc85e9397b36d4a369bb477abd2822ab2w.webp?v=1769598483`,
      `${cdn}S597200a90d5e424f849897db12e482a1a.webp?v=1769598483`,
      `${cdn}Sbb070b4572ae45f299b9708fb5cc60abD.webp?v=1769598483`,
    ],
    features: [
      "Clear markings for seam measurements",
      "Designed for patchwork, quilting and sewing projects",
      "Available in 10 cm and 21 cm sizes",
    ],
    variants: [
      { id: "ruleaxis-10", label: "10 cm", price: 24.99 },
      { id: "ruleaxis-21", label: "21 cm", price: 24.99 },
    ],
  },
];

export const featuredProductHandles = [
  "5-in-1-quilt-cutting-template",
  "the-vintage-log-cabin-quilt-guide",
  "the-ultimate-quilt-chart-1",
  "quilters-cutting-mat",
] as const;

export const productCategories: ProductCategory[] = [
  "Cutting Templates",
  "Quilting Guides",
  "Cutting Mats",
  "Quilting Rulers",
];

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
