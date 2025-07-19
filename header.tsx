import styles from './header.module.css';
import Link from 'next/link';
const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/barang">Data Barang</Link>
      </nav>
    </header>
  );
};

export default Header;