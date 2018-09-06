import { encryptPassword } from '../helpers/utils';

const users = [
  {
    id: 1,
    fullname: 'John Kepler',
    email: 'johnkepler@mail.com',
    password: encryptPassword('farayola'),
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    fullname: 'Farayola Timileyin',
    email: 'fartim96@mail.com',
    password: encryptPassword('farayola'),
    isAdmin: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    fullname: 'Fast Food Fast',
    email: 'fastfood@foodie.com',
    password: encryptPassword('farayola'),
    isAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default users;
