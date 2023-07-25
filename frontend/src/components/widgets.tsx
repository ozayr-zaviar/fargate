import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const Widget = () => {
    interface Subscription {
        User: {
          username: string;
        };
        email: string;
        Magazine: {
          name: string;
          publisher: string;
        };
        startDate: string;
        endDate: string;
      }
  const [userData, setUserData] = useState<Subscription[]>([]);

  useEffect(() => {
    // Fetch user data and set the state
    // Replace the URL with your API endpoint
    fetch(`${process.env.BACKEND_SERVER}:${process.env.BACKEND_PORT}/subscriptions`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
    {userData.map(subscription => (
      <Card>
        <Card.Body>
          <Card.Title>{subscription.User.username}</Card.Title>
          <Card.Subtitle>{subscription.email}</Card.Subtitle>
          <Card.Text>
            Magazine: {subscription.Magazine.name} ({subscription.Magazine.publisher})
            <br />
            Subscription Start Date: {subscription.startDate}
            <br />
            Subscription End Date: {subscription.endDate}
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
  </>
  );
};

export default Widget;
