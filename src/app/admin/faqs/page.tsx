"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Globe, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteDialog } from "@/components/admin/ConfirmDialog";
import { LoadingState, EmptyState } from "@/components/admin/LoadingState";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from "@/lib/repositories/faqs";
import { FAQItem } from "@/types/admin";

import { BilingualField } from "@/components/admin/BilingualField";

import { SearchInput } from "@/components/admin/SearchInput";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);
  const [question, setQuestion] = useState("");
  const [questionTa, setQuestionTa] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerTa, setAnswerTa] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await getFAQs();
      setFaqs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setQuestion("");
    setQuestionTa("");
    setAnswer("");
    setAnswerTa("");
    setPublished(true);
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: any) => {
    setEditingItem(faq);
    setQuestion(faq.question);
    setQuestionTa(faq.questionTa || "");
    setAnswer(faq.answer);
    setAnswerTa(faq.answerTa || "");
    setPublished(faq.published);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    setSaving(true);

    try {
      if (editingItem) {
        await updateFAQ(editingItem.id, {
          question,
          questionTa,
          answer,
          answerTa,
          published,
        } as any);
      } else {
        await createFAQ({
          question,
          questionTa,
          answer,
          answerTa,
          displayOrder: faqs.length + 1,
          published,
        } as any);
      }
      setModalOpen(false);
      fetchFaqs();
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (faq: FAQItem) => {
    await updateFAQ(faq.id, { published: !faq.published });
    fetchFaqs();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteFAQ(deleteId);
      setDeleteId(null);
      fetchFaqs();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ Management"
        description="Add, edit, or reorder frequently asked questions."
        breadcrumbs={[{ label: "FAQs" }]}
        actions={
          <Button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#F47920] text-white text-xs uppercase font-semibold rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add FAQ
          </Button>
        }
      />

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <SearchInput
          value={search}
          onSearchChange={setSearch}
          placeholder="Search FAQs by question or answer..."
        />
      </div>

      {loading ? (
        <LoadingState message="Loading FAQs..." />
      ) : faqs.filter((f) =>
          !search ||
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase())
        ).length === 0 ? (
        <EmptyState
          title="No FAQs Found"
          description={search ? "No questions match your search." : "Add questions and answers for your clients."}
          actionText="Add FAQ"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="space-y-3">
          {faqs
            .filter((f) =>
              !search ||
              f.question.toLowerCase().includes(search.toLowerCase()) ||
              f.answer.toLowerCase().includes(search.toLowerCase())
            )
            .map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="flex-1 flex items-start gap-3 text-left group"
                  >
                    <div className="p-1 rounded bg-gray-100 text-gray-500 group-hover:bg-[#F47920]/10 group-hover:text-[#F47920] transition-colors mt-0.5 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base group-hover:text-[#F47920] transition-colors">
                        {faq.question}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">Order #{faq.displayOrder}</span>
                        <StatusBadge status={faq.published ? "Published" : "Draft"} />
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleTogglePublish(faq)}
                      title={faq.published ? "Unpublish FAQ" : "Publish FAQ"}
                      className="p-1.5 text-gray-500 hover:text-[#F47920] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {faq.published ? <FileText className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(faq.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-600 leading-relaxed animate-in fade-in duration-150 pl-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit FAQ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl my-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-hidden">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 shrink-0">
              {editingItem ? "Edit FAQ" : "Add New FAQ"}
            </h3>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto pr-1 space-y-4 py-2">
              <BilingualField
                label="Question"
                sourceValue={question}
                targetValue={questionTa}
                onSourceChange={setQuestion}
                onTargetChange={setQuestionTa}
                placeholderSource="What services does Sivaguru Builders provide?"
                placeholderTarget="சிவகுரு பில்டர்ஸ் என்ன சேவைகளை வழங்குகிறது?"
              />

              <BilingualField
                label="Answer"
                isTextArea
                rows={4}
                sourceValue={answer}
                targetValue={answerTa}
                onSourceChange={setAnswer}
                onTargetChange={setAnswerTa}
                placeholderSource="Provide a detailed and helpful answer..."
                placeholderTarget="விரிவான மற்றும் உதவியான பதிலை வழங்கவும்..."
              />

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="faq-publish"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-gray-300 text-[#F47920] focus:ring-[#F47920]"
                />
                <label htmlFor="faq-publish" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Publish FAQ to website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase rounded-xl"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#F47920] text-white text-xs font-semibold uppercase rounded-xl"
                >
                  {saving ? "Saving..." : "Save FAQ"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete FAQ?"
        description="Are you sure you want to delete this FAQ item?"
        isLoading={deleting}
      />
    </div>
  );
}
