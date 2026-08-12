// src/components/jobs/JobFilters.tsx
import { Search, Filter, SortAsc } from 'lucide-react';
import { JOB_STATUSES } from '../../utils/constants';

interface JobFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  sortOrder: string;
  onSortOrderChange: (v: string) => void;
  onSearch: () => void;
  searching: boolean;
}

export default function JobFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
  onSearch,
  searching,
}: JobFiltersProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={16} />
        </div>
        <input
          id="job-search-input"
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field pl-10 pr-4"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Filter size={14} />
        </div>
        <select
          id="job-status-filter"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="input-field pl-9 pr-4 w-36 appearance-none cursor-pointer"
        >
          <option value="">All Statuses</option>
          {JOB_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <SortAsc size={14} />
        </div>
        <select
          id="job-sort-select"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="input-field pl-9 pr-4 w-40 appearance-none cursor-pointer"
        >
          <option value="id,desc">Newest First</option>
          <option value="id,asc">Oldest First</option>
          <option value="company,asc">Company A–Z</option>
          <option value="company,desc">Company Z–A</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={searching}
        className="btn-primary flex items-center gap-2"
        id="job-search-btn"
      >
        {searching ? (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <Search size={15} />
        )}
        Search
      </button>
    </div>
  );
}
