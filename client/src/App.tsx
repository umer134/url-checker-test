import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { JobDetails } from "./components/JobDetails/JobDetails";
import { JobForm } from "./components/JobForm/JobForm";
import { JobList } from "./components/JobList/JobList";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Layout>
        <JobForm />
        <Dashboard jobs={<JobList />} details={<JobDetails />} />
      </Layout>
    </>
  );
}

export default App;
