"use client";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { useLazyFetchRestaurantTablesQuery } from "@/services/rtk/restaurantsApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const RestaurantTablesContainer = () => {
  const params = useParams();
  const restaurant = params?.restaurant;

  const [getTables, { data: tables }] = useLazyFetchRestaurantTablesQuery();

  useEffect(() => {
    getTables({
      restaurant: restaurant,
    });
  }, [restaurant]);

  return (
    <Container>
      <Heading>Tables</Heading>
      {tables?.data?.map((table) => {
        return (
          <Link href={`/restaurants/${restaurant}/tables/${table?._id}`}>
            <Card>
              <CardContent>
                <h1>{table?.number}</h1>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
};

export default RestaurantTablesContainer;
