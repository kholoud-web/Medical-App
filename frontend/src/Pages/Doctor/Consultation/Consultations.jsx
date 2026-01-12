import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConsultations,
  acceptConsultation,
  rejectConsultation,
  fetchConsultationDetails,
} from "../../../RiduxToolkit/Slices/ConsultationSlice";

import ConsultationsHeader from "./components/ConsultationsHeader";
import ConsultationCard from "./components/ConsultationCard";
import ConsultationPanel from "./components/ConsultationPanel";
import ModifyDiagnosisModal from "./components/ModifyDiagnosisModal ";
import RejectDiagnosisModal from "./components/RejectDiagnosisModal ";
import { fetchModifyData } from "../../../RiduxToolkit/Slices/modifyConsultationSlice";

const Consultations = () => {
  const dispatch = useDispatch();
  const { consultations, loading, error } = useSelector(
    (state) => state.consultation
  );

  const {selectedConsultation} = useSelector((state) => state.consultation);
  const [openModify, setOpenModify] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  //  Fetch data once component mounts
  useEffect(() => {
    dispatch(fetchConsultations());
  }, [dispatch]);

  const filteredConsultations = consultations.filter((item) => {
  const matchesSearch =
    item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.symptoms?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || item.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* القسم الرئيسي */}
      <div className="flex-1 flex flex-col min-w-0">
        <ConsultationsHeader 
        search={searchTerm}
        status={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
  />

        {/* Loading/Error Handling */}
        {loading && <p>Loading consultations...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-1 px-4 md:px-6 pb-6 gap-4 md:gap-6">
          <div className="flex-grow space-y-3">
            <div className="hidden xl:grid border border-blue-400 rounded-xl grid-cols-6 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
              <div>Patient</div>
              <div>Type</div>
              <div>Symptoms</div>
              <div>Response</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            <div className="space-y-3">
              {filteredConsultations.map((item) => (
                <ConsultationCard
                  key={item.id}
                  data={item}
                  onView={() => {
                    dispatch(fetchConsultationDetails(item.id));
                }}
                />
              ))}
            </div>
          </div>

          {/* Panel جانبي */}
          <div className="hidden lg:block lg:w-[280px] xl:w-[360px] flex-shrink-0">
            <ConsultationPanel
              data={selectedConsultation}
              onModify={() => {
                dispatch(fetchModifyData(selectedConsultation.id));
                setOpenModify(true);
              }}
              onReject={() => setOpenReject(true)}
              onAccept={() =>
                dispatch(acceptConsultation(selectedConsultation.id))
              }
            />
          </div>

          {/* Modals */}
          {openModify && (
            <ModifyDiagnosisModal
              consultation={selectedConsultation}
              onClose={() => setOpenModify(false)}
            />
          )}

          {openReject && (
            <RejectDiagnosisModal
              onClose={() => setOpenReject(false)}
              onSubmit={({ reason, notes }) => {
                dispatch(
                  rejectConsultation({
                    consultationId: selectedConsultation.id,
                    reason,
                    notes,
                  })
                );
                setOpenReject(false);
                }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultations;
