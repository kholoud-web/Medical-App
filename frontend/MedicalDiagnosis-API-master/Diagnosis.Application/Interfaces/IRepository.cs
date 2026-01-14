using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.Interfaces
{
    public interface IRepository<TEntity>
    {
        IQueryable<TEntity> Query(); 
        Task<List<TEntity>> GetAllAsync();
        Task<HashSet<TEntity>> GetAllPagedAsync(int pageSize, int pageNumber, Expression<Func<TEntity, object>> orderBy);

        Task<List<TEntity>> GetManyAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity?> GetByIdAsync(object[] keyValues);

        Task AddAsync(TEntity entity);
        void Update(TEntity entity);
        Task<bool> DeleteAsync(params object[] id);
    }
}
