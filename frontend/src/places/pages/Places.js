import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Places = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlacesAndUsers = async () => {
      try {
        const placesResponseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/places`
        );

        const usersResponseData = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/users`
        );

        const places = placesResponseData.places;
        const users = usersResponseData.users;

        const mergedObjects = places.map((place) => ({
          ...place,
          ...users.find((user) => user.id === place.creator),
        }));

        setLoadedPlaces(mergedObjects);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlacesAndUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </>
  );
};

export default Places;
