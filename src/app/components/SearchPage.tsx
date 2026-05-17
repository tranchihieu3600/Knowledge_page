import { useState } from 'react';
import { Link } from 'react-router';
import { Search, ChevronDown, ChevronRight, FileText, ExternalLink, Download, BookOpen, Users } from 'lucide-react';

interface LessonPlan {
  id: number | string;
  title: string;
  topic: string;
  studentType: string;
  lessonType?: string;
  knowledge: string[];
  summary: string;
  author: string;
  date: string;
  wordFileUrl?: string;
  wordPreview?: string;
}

const mockLessonPlans: LessonPlan[] = [
  {
    id: 1,
    title: 'Di truyền học Mendel: Quy luật phân li',
    topic: 'Di truyền học',
    studentType: 'Học sinh thành thị',
    knowledge: ['Quy luật di truyền Mendel', 'Đột biến gen'],
    summary: 'Bài giảng giới thiệu về quy luật phân li của Mendel, bao gồm các khái niệm cơ bản về gen trội, gen lặn và cách tính tỷ lệ phân li. Học sinh sẽ thực hành giải bài tập sơ đồ Punnett.',
    author: 'Nguyễn Văn A',
    date: '2024-03-15',
    wordFileUrl: '#',
    wordPreview: 'Bản Word mô tả chi tiết kế hoạch bài giảng về Mendel, bao gồm phần giới thiệu, mục tiêu học tập, hoạt động thảo luận và ví dụ bài tập minh hoạ.',
  },
  {
    id: 2,
    title: 'Quá trình quang hợp ở thực vật',
    topic: 'Sinh học tế bào',
    studentType: 'Học sinh nông thôn',
    knowledge: ['Quá trình quang hợp', 'Cấu trúc tế bào'],
    summary: 'Khám phá cơ chế quang hợp, vai trò của diệp lục và sự chuyển hóa năng lượng ánh sáng thành năng lượng hóa học. Bài học kết hợp thí nghiệm quan sát lá cây.',
    author: 'Trần Thị B',
    date: '2024-03-14',
    wordFileUrl: '#',
    wordPreview: 'Bản Word trình bày nội dung bài học về quá trình quang hợp, gồm phần mô tả pha sáng, pha tối và hướng dẫn thí nghiệm kiểm tra hoạt động quang hợp.',
  },
  {
    id: 3,
    title: 'Hệ sinh thái và chu trình dinh dưỡng',
    topic: 'Sinh thái học',
    studentType: 'Học sinh thành thị',
    knowledge: ['Hệ sinh thái', 'Chu trình dinh dưỡng', 'Đa dạng sinh học'],
    summary: 'Phân tích mối quan hệ giữa các sinh vật trong hệ sinh thái, chu trình carbon, nitơ và vai trò của sinh vật phân giải. Học sinh làm việc nhóm để xây dựng mô hình lưới thức ăn.',
    author: 'Lê Văn C',
    date: '2024-03-13',
    wordFileUrl: '#',
    wordPreview: 'Bản Word cung cấp hướng dẫn phân tích hệ sinh thái, bao gồm sơ đồ chu trình dinh dưỡng và câu hỏi thảo luận nhóm về mối quan hệ giữa các loài.',
  },
  {
    id: 4,
    title: 'Cấu trúc và chức năng của ADN',
    topic: 'Sinh học phân tử',
    studentType: 'Học sinh thành thị',
    knowledge: ['ADN và ARN', 'Cấu trúc tế bào'],
    summary: 'Giới thiệu về cấu trúc xoắn kép của ADN, các nucleotide và vai trò lưu trữ thông tin di truyền. Bài giảng sử dụng mô hình 3D để minh họa cấu trúc phân tử.',
    author: 'Phạm Thị D',
    date: '2024-03-12',
    wordFileUrl: '#',
    wordPreview: 'Bản Word mô tả cấu trúc ADN và ARN, các loại nucleotide, cách phân chia chức năng và hoạt động thực hành làm mô hình phân tử.',
  },
  {
    id: 5,
    title: 'Chọn lọc tự nhiên và tiến hóa',
    topic: 'Tiến hóa',
    studentType: 'Học sinh nông thôn',
    knowledge: ['Chọn lọc tự nhiên', 'Đột biến gen'],
    summary: 'Học thuyết tiến hóa của Darwin, các bằng chứng về tiến hóa và cơ chế chọn lọc tự nhiên trong tự nhiên. Thảo luận về sự thích nghi của sinh vật với môi trường địa phương.',
    author: 'Hoàng Văn E',
    date: '2024-03-11',
    wordFileUrl: '#',
    wordPreview: 'Bản Word trình bày bài học về chọn lọc tự nhiên và tiến hóa, kèm theo các ví dụ thực tế và câu hỏi thảo luận để học sinh suy nghĩ.',
  },
  {
    id: 6,
    title: 'Hô hấp tế bào và chuyển hóa năng lượng',
    topic: 'Sinh học tế bào',
    studentType: 'Học sinh thành thị',
    knowledge: ['Hô hấp tế bào', 'Cấu trúc tế bào'],
    summary: 'Tìm hiểu quá trình hô hấp hiếu khí và kỵ khí, vai trò của ty thể trong sản xuất ATP. Học sinh thực hiện thí nghiệm đo tốc độ hô hấp của nấm men.',
    author: 'Đỗ Thị F',
    date: '2024-03-10',
    wordFileUrl: '#',
    wordPreview: 'Bản Word tóm tắt cơ chế hô hấp tế bào, các bước chuỗi vận chuyển điện tử và hướng dẫn thực hành quan sát nấm men.',
  },
];

import { useAppContext, Folder, studentTypes, lessonTypes } from '../context';

export default function SearchPage() {
  const { folders } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedStudentTypes, setSelectedStudentTypes] = useState<string[]>([]);
  const [selectedLessonTypes, setSelectedLessonTypes] = useState<string[]>([]);
  const [selectedKnowledge, setSelectedKnowledge] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['root']);

  const getAllKnowledge = (folderList: Folder[]): string[] => {
    return Array.from(
      new Set(folderList.flatMap(folder => [...folder.knowledge, ...getAllKnowledge(folder.children)]))
    );
  };
  const allKnowledgeItems = getAllKnowledge(folders);

  const getAllFiles = (folderList: Folder[]): LessonPlan[] => {
    let files: LessonPlan[] = [];
    for (const folder of folderList) {
      const folderFiles = folder.files.map((file) => ({
        id: file.id,
        title: file.name,
        topic: folder.name,
        studentType: file.studentType,
        lessonType: file.lessonType,
        knowledge: file.knowledge,
        summary: `Tài liệu: ${file.name}`,
        author: 'Giáo viên',
        date: file.uploadDate.toISOString(),
      }));
      files = [...files, ...folderFiles, ...getAllFiles(folder.children)];
    }
    return files;
  };

  const allPlans = [...mockLessonPlans, ...getAllFiles(folders)];

  const getSelectedFoldersKnowledge = (folderList: Folder[], selected: string[]): string[] => {
    let result: string[] = [];
    for (const folder of folderList) {
      if (selected.includes(folder.name)) {
        result = [...result, ...getAllKnowledge([folder])];
      } else {
        result = [...result, ...getSelectedFoldersKnowledge(folder.children, selected)];
      }
    }
    return Array.from(new Set(result));
  };

  const getExpandedSelectedTopics = (folderList: Folder[], selected: string[], isParentSelected = false): string[] => {
    let result: string[] = [];
    for (const folder of folderList) {
      const isSelected = isParentSelected || selected.includes(folder.name);
      if (isSelected) {
        result.push(folder.name);
      }
      result = [...result, ...getExpandedSelectedTopics(folder.children, selected, isSelected)];
    }
    return result;
  };

  const expandedSelectedTopics = getExpandedSelectedTopics(folders, selectedTopics);

  const dynamicKnowledgeItems = selectedTopics.length === 0 
    ? allKnowledgeItems 
    : getSelectedFoldersKnowledge(folders, selectedTopics);

  const filteredByTopic = allPlans.filter(plan => 
    selectedTopics.length === 0 || expandedSelectedTopics.includes(plan.topic)
  );

  const dynamicStudentTypes = studentTypes.filter(type => 
    selectedTopics.length === 0 || filteredByTopic.some(plan => plan.studentType.toLowerCase().includes(type.toLowerCase()))
  );
  
  const dynamicLessonTypes = lessonTypes.filter(type => 
    selectedTopics.length === 0 || filteredByTopic.some(plan => plan.lessonType?.toLowerCase() === type.toLowerCase() || (!plan.lessonType && plan.title.toLowerCase().includes(type.toLowerCase())))
  );

  const toggleTopicExpand = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const toggleStudentType = (type: string) => {
    setSelectedStudentTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleKnowledge = (knowledge: string) => {
    setSelectedKnowledge(prev =>
      prev.includes(knowledge) ? prev.filter(k => k !== knowledge) : [...prev, knowledge]
    );
  };

  const toggleLessonType = (type: string) => {
    setSelectedLessonTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedTopics([]);
    setSelectedStudentTypes([]);
    setSelectedLessonTypes([]);
    setSelectedKnowledge([]);
    setSearchQuery('');
  };

  const filteredResults = allPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopics.length === 0 || expandedSelectedTopics.includes(plan.topic);
    const matchesStudentType = selectedStudentTypes.length === 0 ||
                               selectedStudentTypes.some(type =>
                                 plan.studentType.toLowerCase().includes(type.toLowerCase())
                               );
    const matchesLessonType = selectedLessonTypes.length === 0 ||
                              selectedLessonTypes.some(type =>
                                plan.lessonType?.toLowerCase() === type.toLowerCase() || (!plan.lessonType && plan.title.toLowerCase().includes(type.toLowerCase()))
                              );
    const matchesKnowledge = selectedKnowledge.length === 0 ||
                            selectedKnowledge.some(k => plan.knowledge.includes(k));

    return matchesSearch && matchesTopic && matchesStudentType && matchesLessonType && matchesKnowledge;
  });

  const activeFilterCount = selectedTopics.length + selectedStudentTypes.length + selectedLessonTypes.length + selectedKnowledge.length;

  const countFiles = (folder: Folder): number => {
    return folder.files.length + folder.children.reduce((acc, child) => acc + countFiles(child), 0);
  };

  const renderFolderTree = (folderList: Folder[], depth = 0) => {
    return folderList.map(folder => (
      <div key={folder.id}>
        <div className="flex items-center gap-1 py-1.5 hover:bg-gray-50 rounded group" style={{ paddingLeft: `${depth}rem` }}>
          {folder.children.length > 0 ? (
            <button
              onClick={() => toggleTopicExpand(folder.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {expandedTopics.includes(folder.id) ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
          <label className="flex items-center flex-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTopics.includes(folder.name)}
              onChange={() => toggleTopic(folder.name)}
              className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
            />
            <span className="ml-2 text-sm text-gray-700 flex-1 truncate">
              📁 {folder.name}
            </span>
            <span className="text-xs text-gray-400 ml-1">
              {countFiles(folder)}
            </span>
          </label>
        </div>
        {folder.children.length > 0 && expandedTopics.includes(folder.id) && (
          <div className="mt-1">
            {renderFolderTree(folder.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - 25% */}
        <aside className="w-1/4 bg-white border-r border-gray-200 min-h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg text-gray-800 font-medium">Bộ lọc</h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  Xóa tất cả ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Tree-view: Folder Structure */}
            <div className="mb-8">
              <h3 className="text-sm text-gray-700 font-medium mb-3">Cây thư mục bài giảng</h3>
              <div className="space-y-1">
                {renderFolderTree(folders)}
              </div>
            </div>

            {/* Filter: Student Type */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-700 font-medium mb-3">Lọc theo Đối tượng giảng dạy</h3>
              <div className="space-y-2">
                {dynamicStudentTypes.length === 0 ? <p className="text-xs text-gray-500 italic">Không có lựa chọn nào</p> : dynamicStudentTypes.map(type => (
                  <label key={type} className="flex items-center py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedStudentTypes.includes(type)}
                      onChange={() => toggleStudentType(type)}
                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Lesson Type */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-700 font-medium mb-3">Lọc theo Loại hình tiết dạy</h3>
              <div className="space-y-2">
                {dynamicLessonTypes.length === 0 ? <p className="text-xs text-gray-500 italic">Không có lựa chọn nào</p> : dynamicLessonTypes.map(type => (
                  <label key={type} className="flex items-center py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedLessonTypes.includes(type)}
                      onChange={() => toggleLessonType(type)}
                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Biology Knowledge */}
            <div className="mb-6">
              <h3 className="text-sm text-gray-700 font-medium mb-3">Lọc theo Kiến thức môn học</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {dynamicKnowledgeItems.length === 0 ? <p className="text-xs text-gray-500 italic">Không có lựa chọn nào</p> : dynamicKnowledgeItems.map(knowledge => (
                  <label key={knowledge} className="flex items-center py-1.5 px-2 hover:bg-gray-50 rounded cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedKnowledge.includes(knowledge)}
                      onChange={() => toggleKnowledge(knowledge)}
                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {knowledge}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content - 75% */}
        <main className="w-3/4 p-8">
          {/* Search Bar Header */}
          <div className="mb-8">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm kế hoạch bài giảng theo tên hoặc nội dung..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white shadow-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Tìm thấy <span className="font-medium text-gray-800">{filteredResults.length}</span> kết quả
              {searchQuery && ` cho "${searchQuery}"`}
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 gap-6">
            {filteredResults.map(plan => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all group"
              >
                <Link to={`/detail/${plan.id}`} className="block p-5">
                  {/* Title */}
                  <h3 className="text-base text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {plan.title}
                  </h3>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium">
                      <BookOpen className="w-3 h-3" />
                      {plan.topic}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">
                      <Users className="w-3 h-3" />
                      {plan.studentType}
                    </span>
                  </div>

                  {/* Summary - 3 lines */}
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {plan.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>{plan.author}</span>
                    <span>•</span>
                    <span>{new Date(plan.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </Link>

                {/* Action Buttons */}
                <div className="px-5 pb-4 flex gap-2">
                  <Link
                    to={`/detail/${plan.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Xem chi tiết
                  </Link>
                  {plan.wordFileUrl && (
                    <a
                      href={plan.wordFileUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Đang tải xuống file Word...');
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Tải file
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResults.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-700 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-sm text-gray-500 mb-4">
                Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
