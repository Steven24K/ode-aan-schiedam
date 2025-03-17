import { DisplayContent } from '@/components/DisplayContent';
import { Hero } from '@/components/Hero';
import Link from 'next/link';

export default function NotFound() {
    return <>
        <Hero title={'Pagina niet gevonden'} color={'sunny-yellow'} />
        <DisplayContent>
            <div className="flex items-center justify-center h-96">
                <div className="text-left">
                    <h1 className="text-6xl font-bold text-gray-800">404</h1>
                    <p className="text-2xl text-gray-600 mt-4">Dat is een error</p>
                    <p className="text-gray-500 mt-2">Sorry, de pagina waar je naar zoekt bestaat niet meer of is verplaatst.</p>

                    <Link className="text-blue-500 hover:underline mt-4 block" href="/">
                        Ga terug naar de homepage
                    </Link>
                </div>
            </div>
        </DisplayContent>
    </>
}