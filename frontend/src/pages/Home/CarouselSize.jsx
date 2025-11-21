// import * as React from "react"

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// export function CarouselSize() {
//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       className="w-full max-w-sm"
//     >
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
//   )
// }

import * as React from "react";

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import veg from "../../images/veg.png";
import nveg from "../../images/nveg.png";

import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export default function CarouselSize() {

  const categories = [
    {
      title: "Healthy Salad",
      time: "Breakfast",
      img_link: img1,
      veg: true,
      color: "#ED7B7E",
      link: "",
    },
    {
      title: "Oatsmeal",
      time: "Lunch",
      img_link: img2,
      veg: true,
      color: "#F98B3D",
      link: "",
    },
    {
      title: "Sprout Salad",
      time: "Breakfast",
      img_link: img3,
      veg: true,
      color: "#6EDA49",
      link: "",
    },
    {
      title: "Grilled Chicken",
      time: "Lunch",
      img_link: img4,
      veg: false,
      color: "#7B79F5",
      link: "",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-4"
    >
      <CarouselContent>
        {categories.map((item, index) => (
          <CarouselItem key={index} className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <Link
              to={item.link}
              className="relative rounded-2xl aspect-[28/32] w-full shadow-xl overflow-hidden"
              style={{ backgroundColor: item.color }}
            >
              <img
                src={item.img_link}
                className="absolute w-[60%] left-1/2 -translate-x-1/2 -top-[5%]"
                alt=""
              />

              <div className="absolute bottom-0 h-[55%] w-full">
                <h1 className="text-white text-center text-2xl font-semibold">
                  {item.title}
                </h1>
                <h2 className="text-white text-center opacity-90">
                  {item.time}
                </h2>

                <div className="mt-4 w-[70%] mx-auto flex items-center justify-between">
                  <div className="view-category px-6 py-2 w-[70%] rounded-full bg-white flex items-center justify-center gap-2">
                    <p className="text-sm font-medium">View</p>
                    <div
                      className="aspect-square rounded-full p-2"
                      style={{ backgroundColor: item.color }}
                    >
                      <FaArrowRight color="white" />
                    </div>
                  </div>

                  <img
                    src={item.veg ? veg : nveg}
                    className="w-8 aspect-square"
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
