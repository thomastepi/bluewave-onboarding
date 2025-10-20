'use strict';
const constants = require('../src/utils/constants.helper');
const userRole = constants.ROLE;

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = '$2a$10$vJk551TfHzR8WpiqKlaFe.L8ORsoOPQnwAt0mVzPLpyjdpZNFSM2a'; // Bluewave@1234!

    // 1) Users
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Thomas',
          surname: 'Tepi',
          email: 'thomastepi@hotmail.com',
          password: hashedPassword,
          role: userRole.ADMIN,
          createdAt: new Date(),
        },
      ],
      {}
    );

    // 2) Hints
    await queryInterface.bulkInsert(
      'hints',
      [
        {
          action: 'open url',
          url: 'https://www.thomastepi.com',
          actionButtonUrl: 'https://www.thomastepi.com',
          actionButtonText: 'Visit my portfolio',
          targetElement: '._text_ophip_12',
          tooltipPlacement: 'right',
          hintContent:
            'Guidefox powers onboarding with tours, popups, banners, helper links, and hints. This demo uses my personal links and data.',
          header: 'Welcome to Thomas’s demo',
          headerBackgroundColor: '#FFFFFF',
          headerColor: '#101828',
          textColor: '#101828',
          buttonBackgroundColor: '#7F56D9',
          buttonTextColor: '#FFFFFF',
          createdBy: 1,
          repetitionType: 'show only once',
          isHintIconVisible: true,
        },
      ],
      {}
    );

    // 3) Popups
    await queryInterface.bulkInsert(
      'popups',
      [
        {
          popupSize: 'small',
          closeButtonAction: 'open url',
          url: 'https://www.thomastepi.com',
          actionButtonUrl: 'https://www.thomastepi.com',
          actionButtonText: 'Open Portfolio',
          headerBackgroundColor: '#e4c2f0',
          headerColor: '#450fbd',
          textColor: '#344054',
          buttonBackgroundColor: '#7F56D9',
          buttonTextColor: '#FFFFFF',
          header: 'Hi, I’m Thomas',
          content:
            '<p>This is my personal Guidefox demo. Explore seeded guides and see how the dashboard manages them.</p>',
          repetitionType: 'show every visit',
          createdBy: 1,
        },
      ],
      {}
    );

    // 4) Banners
    await queryInterface.bulkInsert(
      'banners',
      [
        {
          closeButtonAction: 'open url',
          position: 'top',
          url: 'https://www.thomastepi.com',
          fontColor: '#ffffff',
          backgroundColor: '#5e4b7b',
          bannerText: 'Welcome to Thomas’s Guidefox demo',
          repetitionType: 'show every visit',
          createdBy: 1,
        },
      ],
      {}
    );

    // 5) Helper Link container
    const [helperLink] = await queryInterface.bulkInsert(
      'helper_link',
      [
        {
          title: 'Thomas Tepi — Resources',
          headerBackgroundColor: '#adb2f5',
          linkFontColor: '#344054',
          iconColor: '#7F56D9',
          createdBy: 1,
          url: 'https://www.thomastepi.com',
        },
      ],
      { returning: true }
    );

    // 6) Links
    const links = [
      { title: 'Portfolio Website', url: 'https://www.thomastepi.com', target: true, helperId: helperLink.id },
      { title: 'AI Resume Builder', url: 'https://resumecraft.thomastepi.com', target: true, helperId: helperLink.id },
      {
        title: 'Guidefox commits by Thomas',
        url: 'https://github.com/bluewave-labs/bluewave-onboarding/commits?author=thomastepi',
        target: true,
        helperId: helperLink.id,
      },
      {
        title: 'Guidefox Fork (Agent)',
        url: 'https://github.com/thomastepi/bluewave-onboarding',
        target: true,
        helperId: helperLink.id,
      },
    ];
    await queryInterface.bulkInsert('link', links, {});

    // 7) Teams
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          name: 'Thomas Demo',
          createdAt: new Date(),
          serverUrl: 'http://localhost:5000/api/',
          agentUrl: 'http://localhost:8080/',
        },
      ],
      {}
    );

    // 8) Tours
    const [tour] = await queryInterface.bulkInsert(
      'tours',
      [
        {
          headerColor: '#101828',
          textColor: '#344054',
          buttonBackgroundColor: '#7F56D9',
          buttonTextColor: '#ffffff',
          size: 'medium',
          finalButtonText: 'Complete tour',
          url: 'https://www.thomastepi.com',
          active: true,
          createdBy: 1,
        },
      ],
      { returning: true }
    );

    // 9) Tour steps
    const tourPopups = [
      {
        title: 'Dashboard',
        header: 'Explore your dashboard',
        description: 'This step highlights a key area of the app for onboarding.',
        targetElement: 'div:nth-child(2)>div:nth-child(4)>div:nth-child(1)',
        order: 1,
        tourId: tour.id,
      },
      {
        title: 'Banners',
        header: 'Customize banner styles',
        description: 'Update colors and text pulled dynamically from the DB.',
        targetElement: 'div:nth-child(2)>div:nth-child(4)>div:nth-child(2)',
        order: 2,
        tourId: tour.id,
      },
      {
        title: 'Helper Links',
        header: 'Surface helpful resources',
        description: 'Contextual links keep users in flow while learning.',
        targetElement: 'div:nth-child(2)>div:nth-child(4)>div:nth-child(3)',
        order: 3,
        tourId: tour.id,
      },
    ];
    await queryInterface.bulkInsert('tour_popup', tourPopups, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tour_popup', null, {});
    await queryInterface.bulkDelete('tours', null, {});
    await queryInterface.bulkDelete('teams', null, {});
    await queryInterface.bulkDelete('link', null, {});
    await queryInterface.bulkDelete('helper_link', null, {});
    await queryInterface.bulkDelete('banners', null, {});
    await queryInterface.bulkDelete('popups', null, {});
    await queryInterface.bulkDelete('hints', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
