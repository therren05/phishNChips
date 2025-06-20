import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';


const steps = [
  {
    element: '.step1',
    popover: {
      title: 'Welcome!',
      description: 'This is your email. Your job is to identify phishing emails as quick as possible and report them.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '.step2',
    popover: {
      title: 'Your emails',
      description: 'Your emails will appear here. You will receive new emails frequently. Make sure to stay on top of them.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '.step3',
    popover: {
      title: 'Email view',
      description: 'Once you have selected an email, you can view its content here. Read through it an decide whether it is a phishing email or not.',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.step4',
    popover: {
      title: 'Report',
      description: 'If you have determed an email to be a phishing email, you can report it here.',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.step5',
    popover: {
      title: 'Trash',
      description: 'Otherwise, you can move the email to the trash.',
      side: 'right',
      align: 'center',
    },
  },
  {
    element: '.step6',
    popover: {
      title: 'Timer',
      description: 'Time is ticking and your score relies on how quickly you can identify phishing emails. The faster you are, the higher your score.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '.step6',
    popover: {
      title: 'Gaining time',
      description: 'You can also increase your available time by correctly categorizing emails. Incorrectly categorizing emails will decrease your time.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '.step7',
    popover: {
      title: 'Leaderboard',
      description: 'When the game is over, you can see how you performed compared to others on the leaderboard.',
      side: 'top',
      align: 'center',
    },
  },
  {
    element: '.step1',
    popover: {
      title: 'Get ready',
      description: 'Get ready. The game will begin when you leave this tour. Good luck!',
      side: 'top',
      align: 'center',
    },
  },
];

export const startTour = () => {
  const tour = driver({
    showProgress: true,
    allowClose: true,
    steps,
    onDestroyed: () => {
      window.dispatchEvent(new CustomEvent('tourComplete'));
    },
  });

  tour.drive();
};
