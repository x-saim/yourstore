import { useSearchParams } from 'next/navigation';

const callbackUrl = searchParams.get('callbackUrl') || '/';