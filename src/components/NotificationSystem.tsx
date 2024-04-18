import { createSignal, onCleanup, onMount } from 'solid-js';

export const prerender = true;

import SlackIcon from './slackWEBP_36.webp';

// Define the type for a notification
type Notification = {
  id: number;
  text: string;
};

const notifications = [
  { id: 1, text: "🔥 Issue Alert: Noticeable dip in lead quality despite increased ad spend. Urgent discussion needed!" },
  { id: 2, text: "Despite our efforts, month-on-month growth is unpredictable. How can we stabilize this?" },
  { id: 3, text: "I've reviewed several strategies, but none seem right. We're at a crossroads." },
  { id: 4, text: "Heard about RPTrainor at the recent CEO roundtable. They tailor campaigns for high variability markets. Thoughts?" },
  { id: 5, text: "Team meeting update: Decided to partner with RPTrainor. They'll handle our next campaign with a custom approach." },
  { id: 6, text: "Initial results are in! Seeing a more consistent lead quality and conversion rate. Is this our turning point?" },
  { id: 7, text: "🚀 RPTrainor has not only stabilized our lead generation but also projected a strong QoQ growth. We’re on a new trajectory!" }
];

function NotificationSystem() {
  const [currentNotification, setCurrentNotification] = createSignal<Notification | null>(null);
  const [notificationIndex, setNotificationIndex] = createSignal(0);

  onMount(() => {
    const interval = setInterval(() => {
      if (notificationIndex() < notifications.length) {
        setCurrentNotification(null); // Clear current notification first
        setTimeout(() => { // Add a short delay before showing the next notification
          setCurrentNotification(notifications[notificationIndex()]);
          setNotificationIndex(notificationIndex() + 1);
        }, 500);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentNotification(null); // Clear the last notification after the last interval
        }, 9000); // Set this to the time each notification is visible
      }
    }, 9000); // Adjust as necessary for your desired notification interval (60000 / notifications.length) + 500
  });

  onCleanup(() => {
    setCurrentNotification(null); // Ensure cleanup when the component unmounts
  });

  return (
    <div class={currentNotification() ? "fixed w-[218px] xs:w-[350px] mb-1 top-16 right-5 bg-gray-200/90 backdrop-opacity-70 backdrop-blur p-3 shadow-lg rounded-[10px] text-base z-50 animate-slide-in-right flex flex-row gap-2" : "hidden"}>
      {currentNotification() && (
        <>
          <div class="min-w-6 min-h-6">
            <img alt="" loading="eager" width="24" height="24" decoding="async" data-nimg="1" class="w-6 h-6 object-container rounded-[12px]" src={SlackIcon.src} />
          </div>
          <div class="grow">
            <div class="font-semibold text-gray-950 truncate">
              #ad-performance
            </div>
            <div class="font-normal text-gray-700 leading-tight text-wrap">
              {currentNotification()!.text}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationSystem;
