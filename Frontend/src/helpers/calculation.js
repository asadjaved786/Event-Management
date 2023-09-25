const calculation = (noOfGuest, eventType) => {
  const event = {
    party: [
      {
        title: "Venue",
        price: 30,
        percentage: 0.3,
        image:
          "https://images.unsplash.com/photo-1600349780687-6d9843b27916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
      },
      {
        title: "Food",
        price: 50,
        percentage: 0.2,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
      {
        title: "Games",
        price: 30,
        percentage: 0.2,
        image:
          "https://images.unsplash.com/photo-1551615993-9ad2e3a5f3ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Security",
        percentage: 0.2,
        price: 20,
        image:
          "https://images.unsplash.com/photo-1571283056653-e9802feac258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Decorations",
        percentage: 0.1,
        price: 30,
        image:
          "https://images.unsplash.com/photo-1485178075098-49f78b4b43b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
    ],
    ceremony: [
      {
        title: "Venue",
        price: 40,
        percentage: 0.4,
        image:
          "https://images.unsplash.com/photo-1534353341328-aede12f06b84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&q=80",
      },
      {
        title: "Food",
        price: 40,
        percentage: 0.3,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
      {
        title: "Security",
        price: 60,
        percentage: 0.2,
        image:
          "https://images.unsplash.com/photo-1571283056653-e9802feac258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Decorations",
        price: 40,
        percentage: 0.1,
        image:
          "https://images.unsplash.com/photo-1485178075098-49f78b4b43b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
    ],
    conference: [
      {
        title: "Venue",
        price: 50,
        percentage: 0.2,
        image:
          "https://images.unsplash.com/photo-1625755568824-c27ef71d62a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
      {
        title: "Food",
        price: 20,
        percentage: 0.1,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
      {
        title: "Speaker Fees",
        price: 100,
        percentage: 0.3,
        image:
          "https://images.unsplash.com/photo-1560439514-e960a3ef5019?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Security",
        price: 60,
        percentage: 0.3,
        image:
          "https://images.unsplash.com/photo-1571283056653-e9802feac258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      { title: "Equipments", price: 40, percentage: 0.1 },
    ],
    wedding: [
      {
        title: "Venue",
        price: 50,
        percentage: 0.3,
        image:
          "https://images.unsplash.com/photo-1534353341328-aede12f06b84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1584&q=80",
      },
      {
        title: "Food",
        price: 60,
        percentage: 0.3,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
      {
        title: "Rituals",
        percentage: 0.2,
        price: 120,
        image:
          "https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Security",
        percentage: 0.1,
        price: 60,
        image:
          "https://images.unsplash.com/photo-1571283056653-e9802feac258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Gifts",
        percentage: 0.1,
        price: 50,
        image:
          "https://plus.unsplash.com/premium_photo-1663840074745-6f2664dccfd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
    ],
    concert: [
      {
        title: "Venue",
        price: 30,
        percentage: 0.2,
        image:
          "https://images.unsplash.com/photo-1600349780687-6d9843b27916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
      },
      {
        title: "Food",
        price: 60,
        percentage: 0.1,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
      { title: "Singer Fees", price: 120, percentage: 0.4 },
      {
        title: "Security",
        price: 100,
        percentage: 0.2,
        image:
          "https://images.unsplash.com/photo-1571283056653-e9802feac258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      },
      {
        title: "Decorations",
        price: 40,
        percentage: 0.1,
        image:
          "https://images.unsplash.com/photo-1485178075098-49f78b4b43b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      },
    ],
  };
  let totalPrice = 0;
  for (const item of event[eventType]) {
    totalPrice = totalPrice + item?.price;
  }
  totalPrice = totalPrice * noOfGuest;
  return { totalPrice, event: event[eventType] };
};

export default calculation;
