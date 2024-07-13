import Link from 'next/link'

export function Footer(){
  return(
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto text-center py-7">
        <ul>
          <li className="inline-block mr-6">
            <Link href="/terms-of-service" className="hover:underline hover:text-green-400">利用規約</Link>
          </li>
          <li className="inline-block mr-6">
            <Link href="/privacy-policy" className="hover:underline hover:text-green-400">プライバシーポリシー</Link>
          </li>
          <li className="inline-block mr-6">
            <Link href="/contact" className="hover:underline hover:text-green-400">お問い合わせ</Link>
          </li>
        </ul> 
        <p className="text-sm mt-3">
          © 2024 GRASS BATTLE All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
