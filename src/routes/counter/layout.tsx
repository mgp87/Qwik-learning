import { Slot, component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return(
    <>
        <div class="flex flex-col justify-center items-center mt-10">
            <Slot/>
        </div>
        <Link href='/' class="mt-10">
            Home
        </Link>
    </>
  )
});