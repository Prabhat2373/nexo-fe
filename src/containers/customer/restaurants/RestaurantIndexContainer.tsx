"use client";
import RestaurantListCard from "@/components/customer/restaurants/RestaurantListCard";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { useLazyFetchRestaurantsQuery } from "@/services/rtk/restaurantsApi";
import React, { useEffect, useState } from "react";

const RestaurantIndexContainer = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [getRestaurants, { data }] = useLazyFetchRestaurantsQuery();

  useEffect(() => {
    getRestaurants({});
  }, []);

  useEffect(() => {
    if (data?.data) {
      setRestaurants(data?.data);
    }
  }, [data?.data]);

  console.log("restaurants", restaurants);
  return (
    <div>
      <Heading>Restaurants</Heading>
      <Container>
        {restaurants?.map((restaurant) => {
          return <RestaurantListCard data={restaurant} />;
        })}
      </Container>
    </div>
  );
};

export default RestaurantIndexContainer;
