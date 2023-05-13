import { NextPage } from "next";

interface PageProps {

}

const Settings: NextPage<PageProps> = (): JSX.Element => {
    return (
    <section className="flex sm:flex-col">
        <h1>Settings</h1>
    </section>
    );
}

export default Settings;