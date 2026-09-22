import React, { useState, useEffect } from 'react';
import { TeacherInputData, GeneratedTeachingKit, ApprovalRecord, VersionHistoryItem, QCValidationReport } from './types';
import { DEFAULT_TEACHER_INPUT } from './data/presets';
import { runQualityControlAudit } from './utils/qualityControl';
import { generateCompleteTeachingKit } from './utils/curriculumEngine';
import { Header } from './components/Header';
import { InputForm } from './components/Stage1Prototype/InputForm';
import { PrototypeStructurePreview } from './components/Stage1Prototype/PrototypeStructurePreview';
import { QualityControlPanel } from './components/Stage1Prototype/QualityControlPanel';
import { ApprovalModal } from './components/Stage2Approval/ApprovalModal';
import { ExecutionProgress, EXECUTION_STEPS } from './components/ExecutionView/ExecutionProgress';
import { DocumentViewer } from './components/ExecutionView/DocumentViewer';
import { VersionHistoryModal } from './components/ExecutionView/VersionHistoryModal';

export default function App() {
  // Input Data state
  const [inputData, setInputData] = useState<TeacherInputData>(DEFAULT_TEACHER_INPUT);

  // Workflow state: Stage 1 (input | preview) or Stage 2 (approval | executing | completed)
  const [currentStage, setCurrentStage] = useState<1 | 2>(1);
  const [stage1SubView, setStage1SubView] = useState<'form' | 'preview'>('form');
  const [executionStatus, setExecutionStatus] = useState<'draft' | 'prototype_ready' | 'executing' | 'completed'>('draft');

  // QC Audit Report state
  const [qcReport, setQcReport] = useState<QCValidationReport>(() => runQualityControlAudit(DEFAULT_TEACHER_INPUT));
  const [isQCModalOpen, setIsQCModalOpen] = useState(false);

  // Stage 2 Approval Modal state
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);

  // Execution Progress state
  const [executingStepIndex, setExecutingStepIndex] = useState(0);

  // Generated Document Kit
  const [generatedKit, setGeneratedKit] = useState<GeneratedTeachingKit | null>(null);

  // Version History state
  const [versionHistory, setVersionHistory] = useState<VersionHistoryItem[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Update input data
  const handleInputChange = (updated: Partial<TeacherInputData>) => {
    const newData = { ...inputData, ...updated };
    setInputData(newData);
    setQcReport(runQualityControlAudit(newData));
  };

  // Move from Form to Prototype Review in Stage 1
  const handleProceedToReview = () => {
    const report = runQualityControlAudit(inputData);
    setQcReport(report);
    setStage1SubView('preview');
    setExecutionStatus('prototype_ready');
  };

  // Trigger Stage 2 Approval Modal
  const handleOpenApprovalModal = () => {
    setIsApprovalModalOpen(true);
  };

  // Handle explicit digital approval and trigger 16-step execution pipeline
  const handleApproveAndExecute = (record: ApprovalRecord) => {
    setIsApprovalModalOpen(false);
    setCurrentStage(2);
    setExecutionStatus('executing');
    setExecutingStepIndex(0);

    // Simulate real-time 16-step execution sequence smoothly
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < EXECUTION_STEPS.length) {
        setExecutingStepIndex(currentStep);
      } else {
        clearInterval(interval);
        // Build the complete kit
        const kit = generateCompleteTeachingKit(inputData, record);
        setGeneratedKit(kit);
        setExecutionStatus('completed');

        // Add to version history
        const newHistoryItem: VersionHistoryItem = {
          id: record.transactionId,
          version: record.prototypeVersion || 'v1.0.0',
          createdAt: new Date().toLocaleString('id-ID'),
          approval: record,
          data: kit,
        };
        setVersionHistory((prev) => [newHistoryItem, ...prev]);
      }
    }, 180);
  };

  const handleResetToNew = () => {
    if (window.confirm('Mulai penyusunan perangkat ajar baru? Riwayat saat ini tetap tersimpan di riwayat versi.')) {
      setCurrentStage(1);
      setStage1SubView('form');
      setExecutionStatus('draft');
      setGeneratedKit(null);
    }
  };

  const handleSelectHistoryVersion = (item: VersionHistoryItem) => {
    setInputData(item.data.metadata.approval.dataSnapshot);
    setGeneratedKit(item.data);
    setCurrentStage(2);
    setExecutionStatus('completed');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        currentStage={currentStage}
        executionStatus={executionStatus}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onReset={handleResetToNew}
        historyCount={versionHistory.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* STAGE 1 VIEW */}
        {currentStage === 1 && (
          <>
            {stage1SubView === 'form' ? (
              <InputForm
                data={inputData}
                onChange={handleInputChange}
                onProceedToReview={handleProceedToReview}
              />
            ) : (
              <PrototypeStructurePreview
                data={inputData}
                qcReport={qcReport}
                onEditForm={() => setStage1SubView('form')}
                onOpenQCModal={() => setIsQCModalOpen(true)}
                onProceedToApproval={handleOpenApprovalModal}
              />
            )}
          </>
        )}

        {/* STAGE 2 VIEW */}
        {currentStage === 2 && (
          <>
            {executionStatus === 'executing' && (
              <ExecutionProgress
                currentStepIndex={executingStepIndex}
                totalSteps={EXECUTION_STEPS.length}
              />
            )}

            {executionStatus === 'completed' && generatedKit && (
              <DocumentViewer
                kit={generatedKit}
                inputData={inputData}
                onRegenerate={() => setIsApprovalModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <QualityControlPanel
        report={qcReport}
        isOpen={isQCModalOpen}
        onClose={() => setIsQCModalOpen(false)}
        onRevalidate={() => setQcReport(runQualityControlAudit(inputData))}
        onProceedToApproval={handleOpenApprovalModal}
      />

      <ApprovalModal
        inputData={inputData}
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onApproveAndExecute={handleApproveAndExecute}
      />

      <VersionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={versionHistory}
        onSelectVersion={handleSelectHistoryVersion}
        currentVersionId={generatedKit?.metadata.approval.transactionId}
      />
    </div>
  );
}
