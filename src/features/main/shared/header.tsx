import React from 'react';

export default function Header(title: string) {
  return (
    <div className="flex gap-1">
      <img src="/images/background-image.png" alt="dumbell photo " className="h-auto " />

      <h3 className=" md:text-6xl  text-sm  font-semibold text-text-primary ">{title}</h3>
    </div>
  );
}
