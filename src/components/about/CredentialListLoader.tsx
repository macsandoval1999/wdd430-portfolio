import CredentialList from "./CredentialList";
import { getAllCredentials } from "@/src/lib/about/credentials-db";

// Async Server Component: fetches credentials from the database, so wrap it in <Suspense> where it is used.
export default async function CredentialListLoader() {
    const credentials = await getAllCredentials();
    return <CredentialList credentials={credentials} />;
}
