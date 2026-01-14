using Diagnosis.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Infrastracture.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DbContext _ctx;
        protected readonly DbSet<T> _set;

        public Repository(DbContext ctx)
        {
            _ctx = ctx ?? throw new ArgumentNullException(nameof(ctx));
            _set = _ctx.Set<T>();
        }

        public IQueryable<T> Query()
        {
            return _set.AsQueryable();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _set.AsNoTracking().ToListAsync();
        }

        public async Task<HashSet<T>> GetAllPagedAsync(int pageSize, int pageNumber, Expression<Func<T, object>> orderBy)
        {
            if (pageSize <= 0) throw new ArgumentOutOfRangeException(nameof(pageSize));
            if (pageNumber <= 0) pageNumber = 1;

            var query = _set.AsNoTracking();

            if (orderBy != null)
                query = query.OrderBy(orderBy);

            var items = await query.Skip((pageNumber - 1) * pageSize)
                                   .Take(pageSize)
                                   .ToListAsync();

            return items.ToHashSet();
        }

        public async Task<List<T>> GetManyAsync(Expression<Func<T, bool>> predicate)
        {
            return await _set.Where(predicate).AsNoTracking().ToListAsync();
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _set.Where(predicate).AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<T?> GetByIdAsync(object[] keyValues)
        {
            if (keyValues == null || keyValues.Length == 0) throw new ArgumentException("Keys required", nameof(keyValues));
            var entity = await _set.FindAsync(keyValues);
            if (entity == null) return null;

            return entity;
        }

        public async Task AddAsync(T entity)
        {
            await _set.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _set.Update(entity);
        }

        public async Task<bool> DeleteAsync(params object[] id)
        {
            var entity = await _set.FindAsync(id);
            if (entity == null) return false;
            _set.Remove(entity);
            return true;
        }
    }

}
