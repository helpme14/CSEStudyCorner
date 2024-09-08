
import LightCornerImage from '../../assets/Light-corner.png';

const EmailTempalte = () => {
  return (
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <header>
        <a href="#">
            <img
            className="w-auto h-7 sm:h-8"
            src={LightCornerImage}
            alt="Study Corner Logo"
            />
        </a>
        </header>
        <main className="mt-8">
        <h2 className="text-gray-700 dark:text-gray-200">Hi Olivia,</h2>

        <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
            This is your verification code:
        </p>

        <div className="flex items-center mt-4 gap-x-4">
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400">
            6
            </p>
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400">
            2
            </p>
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400">
            8
            </p>
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400">
            9
            </p>
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400">
            9
            </p>
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-medium text-blue-500 border border-blue-500 rounded-md dark:border-blue-400 dark:text-blue-400">
            9
            </p>
        </div>

        <p className="mt-4 leading-loose text-gray-600 dark:text-gray-300">
            This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:
        </p>

        <button className="px-6 py-2 mt-6 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Verify email
        </button>

        <p className="mt-8 text-gray-600 dark:text-gray-300">
            Thanks, <br />
            Study Corner Team
        </p>
        </main>

        <footer className="mt-8">
        <p className="text-gray-500 dark:text-gray-400">
            This email was sent to{' '}
            <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
            >
            contact@studycorner.com
            </a>
            . If you'd rather not receive this kind of email, you can{' '}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            unsubscribe
            </a>{' '}
            or{' '}
            <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            manage your email preferences
            </a>
            .
        </p>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Study Corner. All Rights Reserved.
        </p>
        </footer>
  </section>
  )
}

export default EmailTempalte