import Head from 'next/head';

export default function Home() {
  return (
    <div style={styles.container}>
      <Head>
        <title>Train Seat Booking System</title>
        <meta name="description" content="Welcome to the Train Seat Booking System" />
      </Head>
      <h1>Welcome to the Train Seat Booking System</h1>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
};