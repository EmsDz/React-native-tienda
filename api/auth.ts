import users from './users.json';

export async function login(email: string, password: string) {
  const user = users.find((item) => item.email.toLocaleLowerCase() == email.toLocaleLowerCase());
  console.log(user);

  if (email.toLocaleLowerCase() == "admin@admin.com") {
    return { user: "admin", token: "valid", userData: user };
  }

  return { user: "client", token: "valid", userData: user };
}

/*
mock data example
{
  "id": "user123",
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipCode": "12345"
  },
  "roles": ["user", "admin"]
}
*/

