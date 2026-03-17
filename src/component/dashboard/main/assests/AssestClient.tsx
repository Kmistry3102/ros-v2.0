import { DashboardShell } from "../../layout/right/DashboardShell";
import AssetsFilter from "./AssetsFilter";

export default function AssestClient() {
    return (
        <DashboardShell
            title="Assets"
            right={
                <AssetsFilter />
            }
        >
            <div>
                <h1>Assest Client</h1>
            </div>
        </DashboardShell>
    );
}