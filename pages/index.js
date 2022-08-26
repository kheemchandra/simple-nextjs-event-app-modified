import Head from 'next/head';
import { useContext } from 'react';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import NotificationContext from '../store/notification-context';

function HomePage(props) {
  const notificationCtx = useContext(NotificationContext);

  function registerHandler(email){
    notificationCtx.showNotification({
      title: 'Pending',
      message: 'Registering for newsletter!',
      status: 'pending'
    });
    fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email})
    })
    .then(response => {
      if(response.ok){
        return response.json()
      }

      return response.json().then(data => {
        throw new Error('Something went wrong!')
      })
    })
    .then(data => {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully registered for newsletter!',
        status: 'success'
      });
    }).catch(error => {
      notificationCtx.showNotification({
        title: 'Failure',
        message: error.message || 'Registration for newsletter failed!',
        status: 'error'
      })
    });
  }
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration onRegister={registerHandler}/>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
