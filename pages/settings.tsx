import { NextPage } from "next";

interface PageProps {

}

const Settings: NextPage<PageProps> = (): JSX.Element => {
    return (
    <section className="container mx-auto px-4 mt-10">
        <h1>Settings</h1>
    </section>
    );
}

export default Settings;