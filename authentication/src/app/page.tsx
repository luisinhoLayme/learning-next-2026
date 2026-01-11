import Navbar from '@/components/layout/navbar'
import { getAuthenticatedUser } from '@/lib/session';

export default async function Home() {

  const user = await getAuthenticatedUser().catch(() => null);
  console.log(user)

  return (
    <>
      <Navbar user={user} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-5">
        <h1>Home Public</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quidem dolorem iste provident quisquam minima fugit eos asperiores quos voluptate iure! Modi omnis alias, itaque reprehenderit hic quia maiores maxime!</p>
      </main>
    </>
  );
}
