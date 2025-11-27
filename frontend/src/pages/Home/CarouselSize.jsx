// import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";

// export function CarouselSize() {
//   const autoplay = React.useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: false })
//   );

//   return (
//     <Carousel
//       opts={{
//         align: "start",
//         loop: true, // infinite scroll
//       }}
//       plugins={[autoplay.current]}
//       className="w-full max-w-sm"
//     >
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index} className="basis-2/4 md:basis-1/4">
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-3xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }


// import * as React from "react";

// import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";

// import veg from "../../images/veg.png";
// import nveg from "../../images/nveg.png";

// import img1 from "../../images/1.png";
// import img2 from "../../images/2.png";
// import img3 from "../../images/3.png";
// import img4 from "../../images/4.png";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";


// export default function CarouselSize() {

//   const categories = [
//     {
//       title: "Healthy Salad",
//       time: "Breakfast",
//       img_link: img1,
//       veg: true,
//       color: "#ED7B7E",
//       link: "",
//     },
//     {
//       title: "Oatsmeal",
//       time: "Lunch",
//       img_link: img2,
//       veg: true,
//       color: "#F98B3D",
//       link: "",
//     },
//     {
//       title: "Sprout Salad",
//       time: "Breakfast",
//       img_link: img3,
//       veg: true,
//       color: "#6EDA49",
//       link: "",
//     },
//     {
//       title: "Grilled Chicken",
//       time: "Lunch",
//       img_link: img4,
//       veg: false,
//       color: "#7B79F5",
//       link: "",
//     },
//   ];

//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       className="w-full px-4"
//     >
//       <CarouselContent>
//         {categories.map((item, index) => (
//           <CarouselItem key={index} className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
//             <Link
//               to={item.link}
//               className="relative rounded-2xl aspect-[28/32] w-full shadow-xl overflow-hidden"
//               style={{ backgroundColor: item.color }}
//             >
//               <img
//                 src={item.img_link}
//                 className="absolute w-[60%] left-1/2 -translate-x-1/2 -top-[5%]"
//                 alt=""
//               />

//               <div className="absolute bottom-0 h-[55%] w-full">
//                 <h1 className="text-white text-center text-2xl font-semibold">
//                   {item.title}
//                 </h1>
//                 <h2 className="text-white text-center opacity-90">
//                   {item.time}
//                 </h2>

//                 <div className="mt-4 w-[70%] mx-auto flex items-center justify-between">
//                   <div className="view-category px-6 py-2 w-[70%] rounded-full bg-white flex items-center justify-center gap-2">
//                     <p className="text-sm font-medium">View</p>
//                     <div
//                       className="aspect-square rounded-full p-2"
//                       style={{ backgroundColor: item.color }}
//                     >
//                       <FaArrowRight color="white" />
//                     </div>
//                   </div>

//                   <img
//                     src={item.veg ? veg : nveg}
//                     className="w-8 aspect-square"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </Link>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }


import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function CarouselSize() {
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const categories = [
    {
      title: "Healthy Salad",
      time: "Breakfast",
      img_link: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      veg: true,
      color: "#ED7B7E",
    },
    {
      title: "Oatsmeal",
      time: "Lunch",
      img_link: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400",
      veg: true,
      color: "#F98B3D",
    },
    {
      title: "Sprout Salad",
      time: "Breakfast",
      img_link: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
      veg: true,
      color: "#6EDA49",
    },
    {
      title: "Grilled Chicken",
      time: "Lunch",
      img_link: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400",
      veg: false,
      color: "#7B79F5",
    },
    {
      title: "Fruit Bowl",
      time: "Breakfast",
      img_link: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400",
      veg: true,
      color: "#FF6B9D",
    },
    {
      title: "Pasta Delight",
      time: "Dinner",
      img_link: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      veg: true,
      color: "#FFA726",
    },
    {
      title: "Greek Salad",
      time: "Lunch",
      img_link: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      veg: true,
      color: "#4CAF50",
    },
    {
      title: "Smoothie Bowl",
      time: "Breakfast",
      img_link: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
      veg: true,
      color: "#9C27B0",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplay.current]}
      className="w-full max-w-lg"
    >
      <CarouselContent>
        {categories.map((cat, index) => (
          <CarouselItem key={index} className="basis-2/4 md:basis-1/4 bg-amber-600 h-100 ">
            <div className="p-2 w-[10vw]">
              <Card style={{ backgroundColor: cat.color }}>
                <CardContent className="p-0 rounded-xl overflow-hidden">
                  <img
                    src={cat.img_link}
                    alt={cat.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3 text-white">
                    <h3 className="font-semibold text-lg">{cat.title}</h3>
                    <p className="text-sm opacity-90">{cat.time}</p>

                    <span
                      className={`text-xs px-2 py-1 mt-2 inline-block rounded ${
                        cat.veg ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {cat.veg ? "Veg" : "Non-Veg"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
