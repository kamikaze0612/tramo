/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { CityType } from "../contexts/CitiesContext";

const supabaseUrl = "https://nhuujfrrbvxccafolusl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5odXVqZnJyYnZ4Y2NhZm9sdXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNTM2OTAsImV4cCI6MjAxMzcyOTY5MH0.fFd1IvpgZg9VaojCetm6WBl5AYL8yF3tCIlVzzQekMg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export async function getCities() {
  const { data, error } = await supabase.from("cities").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cities couldn't be fetched.");
  }

  return data;
}

export async function addCity(newCity: CityType) {
  const { data, error } = await supabase
    .from("cities")
    .insert([newCity])
    .select();

  if (error) {
    console.error(error);
    throw new Error("City could not be created.");
  }

  return data;
}

export async function selectCity(id: string) {
  const { data, error } = await supabase
    .from("cities")
    .select()
    .eq("cityId", id);

  if (error) {
    console.error(error);
    console.error("City couldn't be fetched.");
  }

  return data?.at(0);
}

export async function removeCity(id: string) {
  const { data, error } = await supabase
    .from("cities")
    .delete()
    .eq("cityId", id);

  if (error) {
    console.error(error);
    console.error("City couldn't be deleted.");
  }
  return data;
}
