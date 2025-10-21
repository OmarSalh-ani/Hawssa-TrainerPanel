'use client';

import { CourseContent } from '@/lib/types/courses';
import { Check, ChevronDown, ChevronUp, FileText, Play } from 'lucide-react';
import { useState } from 'react';
import { ContentViewer } from './content-viewer';

interface CourseCurriculumProps {
  contents: CourseContent[];
}

export function CourseCurriculum({ contents }: CourseCurriculumProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedContent, setSelectedContent] = useState<CourseContent | null>(null);

  const getStatusIcon = (content: CourseContent) => {
    switch (content.status) {
      case 'Completed':
        return <Check className='w-4 h-4 text-orange-600' />;
      case 'In Progress':
        return <div className='w-4 h-4 border-2 border-gray-400 rounded'></div>;
      case 'Not Started':
        return <div className='w-4 h-4 border-2 border-gray-300 rounded'></div>;
      default:
        return null;
    }
  };

  const getContentTypeIcon = (content: CourseContent) => {
    return content.isVideo ? (
      <Play className='w-4 h-4 text-gray-500' />
    ) : (
      <FileText className='w-4 h-4 text-gray-500' />
    );
  };

  return (
    <div className='bg-gray-50 rounded-xl p-6'>
      {/* Module Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='w-full flex items-center justify-between text-left mb-4'
      >
        <h3 className='text-lg font-semibold text-gray-900'>Course Content</h3>
        {isExpanded ? (
          <ChevronUp className='w-5 h-5 text-gray-500' />
        ) : (
          <ChevronDown className='w-5 h-5 text-gray-500' />
        )}
      </button>

      {/* Content List */}
      {isExpanded && (
        <div className='space-y-2'>
          {contents.map(content => (
            <div
              key={content.id}
              onClick={() => setSelectedContent(content)}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer ${
                content.status === 'In Progress'
                  ? 'bg-white border-2 border-orange-200 shadow-sm'
                  : content.status === 'Completed'
                  ? 'bg-orange-50 hover:bg-orange-100'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className='flex items-center space-x-3'>
                <div
                  className={`p-1 rounded ${
                    content.status === 'Completed'
                      ? 'bg-orange-100'
                      : content.status === 'In Progress'
                      ? 'bg-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {getStatusIcon(content)}
                </div>
                <span className='text-sm text-gray-900'>{content.title}</span>
              </div>

              <div className='flex items-center space-x-2'>
                {!content.isVideo && (
                  <span className='text-xs text-orange-600 font-medium'>Reading</span>
                )}
                {content.lengthInMinutes > 0 && (
                  <span className='text-sm text-gray-500'>
                    {Math.floor(content.lengthInMinutes / 60)}:
                    {(content.lengthInMinutes % 60).toString().padStart(2, '0')}
                  </span>
                )}
                {getContentTypeIcon(content)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content Viewer Modal */}
      {selectedContent && (
        <ContentViewer content={selectedContent} onClose={() => setSelectedContent(null)} />
      )}
    </div>
  );
}
