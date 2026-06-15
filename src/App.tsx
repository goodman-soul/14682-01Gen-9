import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SubStationPage } from "@/pages/SubStationPage";
import { ActivityDetail } from "@/pages/ActivityDetail";
import { useAppStore } from "@/store/useAppStore";

const App = () => {
  const applySkin = useAppStore((s) => s.applySkinToDocument);

  useEffect(() => {
    applySkin();
  }, [applySkin]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/scenic" replace />} />
        <Route path="/:station" element={<SubStationPage />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="*" element={<Navigate to="/scenic" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
